import { Component, inject, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

const API = '/api';
const TIMEZONE = 'Europe/Stockholm';
const DEVELOPMENT_PRESETS = [
  {
    label: 'Development Resident + Laundry Room A',
    description: 'Development Resident in Laundry Room A',
    residentId: '22222222-2222-4222-8222-222222222222',
    laundryRoomId: '11111111-1111-4111-8111-111111111111',
  },
] as const;

type DevelopmentPreset = (typeof DEVELOPMENT_PRESETS)[number];
type BookingFlowStep = 'setup' | 'availability' | 'selection' | 'booking' | 'list' | 'cancellation';

interface Slot {
  startTime: string;
  endTime: string;
  status: 'AVAILABLE' | 'BOOKED' | 'BLOCKED';
  reason: string | null;
}

interface AvailabilityResponse {
  laundryRoomId: string;
  date: string;
  timezone: string;
  slotDurationMinutes: number;
  slots: Slot[];
}

interface Booking {
  id: string;
  laundryRoomId: string;
  residentName: string;
  startTime: string;
  endTime: string;
  status: 'ACTIVE' | 'CANCELED';
  canceledAt: string | null;
}

interface BookingsResponse {
  timezone: string;
  items: Booking[];
}

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly http = inject(HttpClient);

  laundryRoomId = '11111111-1111-4111-8111-111111111111';
  residentId = '22222222-2222-4222-8222-222222222222';
  date = new Date().toISOString().slice(0, 10);
  developmentPresets = DEVELOPMENT_PRESETS;

  slots = signal<Slot[]>([]);
  bookings = signal<Booking[]>([]);
  hasQueried = signal(false);

  loadingAvailability = signal(false);
  loadingBookings = signal(false);
  bookingSlotStart = signal<string | null>(null);
  cancelingId = signal<string | null>(null);
  selectedSlotStart = signal<string | null>(null);
  pendingCancelId = signal<string | null>(null);

  availabilityError = signal<string | null>(null);
  bookingsError = signal<string | null>(null);
  actionError = signal<string | null>(null);
  actionSuccess = signal<string | null>(null);

  formatTime(isoUtc: string): string {
    return new Intl.DateTimeFormat('en-GB', {
      timeZone: TIMEZONE,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(new Date(isoUtc));
  }

  slotStart(isoUtc: string): string {
    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: TIMEZONE,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).formatToParts(new Date(isoUtc));
    const h = parts.find((p) => p.type === 'hour')?.value ?? '00';
    const m = parts.find((p) => p.type === 'minute')?.value ?? '00';
    return `${h}:${m}`;
  }

  isFuture(isoUtc: string): boolean {
    return new Date(isoUtc) > new Date();
  }

  hasActiveRequest(): boolean {
    return (
      this.loadingAvailability() ||
      this.loadingBookings() ||
      this.bookingSlotStart() !== null ||
      this.cancelingId() !== null
    );
  }

  setupValidationMessage(): string | null {
    if (!this.laundryRoomId.trim()) return 'Enter a laundry room ID before checking availability.';
    if (!this.date) return 'Choose a date before checking availability.';
    return null;
  }

  bookingValidationMessage(): string | null {
    if (!this.residentId.trim()) return 'Enter a resident ID before creating a booking.';
    return this.setupValidationMessage();
  }

  selectedSlot(): Slot | null {
    const selected = this.selectedSlotStart();
    if (!selected) return null;
    return this.slots().find((slot) => this.slotStart(slot.startTime) === selected) ?? null;
  }

  isSlotSelected(slot: Slot): boolean {
    return this.selectedSlotStart() === this.slotStart(slot.startTime);
  }

  selectSlot(slot: Slot): void {
    if (slot.status !== 'AVAILABLE' || this.hasActiveRequest() || this.pendingCancelId() !== null)
      return;
    this.selectedSlotStart.set(this.slotStart(slot.startTime));
    this.actionError.set(null);
    this.actionSuccess.set(null);
  }

  clearSelectedSlot(): void {
    if (this.hasActiveRequest()) return;
    this.selectedSlotStart.set(null);
  }

  flowStep(): BookingFlowStep {
    if (this.cancelingId() !== null || this.pendingCancelId() !== null) return 'cancellation';
    if (this.bookingSlotStart() !== null || this.selectedSlotStart() !== null) return 'booking';
    if (this.loadingAvailability() || this.loadingBookings()) return 'availability';
    if (!this.hasQueried()) return 'setup';
    if (this.slots().some((slot) => slot.status === 'AVAILABLE')) return 'selection';
    return 'list';
  }

  statusLabel(status: Slot['status']): string {
    const labels: Record<Slot['status'], string> = {
      AVAILABLE: 'Available',
      BOOKED: 'Booked',
      BLOCKED: 'Blocked',
    };
    return labels[status];
  }

  statusBadgeClass(status: Slot['status']): string {
    const base = 'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold';
    const variants: Record<Slot['status'], string> = {
      AVAILABLE: 'bg-green-100 text-green-800',
      BOOKED: 'bg-red-100 text-red-800',
      BLOCKED: 'bg-orange-100 text-orange-800',
    };
    return `${base} ${variants[status]}`;
  }

  bookingStatusLabel(status: Booking['status']): string {
    return status === 'ACTIVE' ? 'Active' : 'Canceled';
  }

  bookingStatusBadgeClass(status: Booking['status']): string {
    const base = 'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold';
    return status === 'ACTIVE'
      ? `${base} bg-green-100 text-green-800`
      : `${base} bg-slate-100 text-slate-600`;
  }

  applyDevelopmentPreset(preset: DevelopmentPreset): void {
    this.clearQueryState();
    this.residentId = preset.residentId;
    this.laundryRoomId = preset.laundryRoomId;
    this.actionError.set(null);
    this.actionSuccess.set(`Loaded demo helper: ${preset.description}.`);
  }

  async load(): Promise<void> {
    const validation = this.setupValidationMessage();
    if (validation) {
      this.actionSuccess.set(null);
      this.actionError.set(validation);
      return;
    }
    this.hasQueried.set(true);
    this.selectedSlotStart.set(null);
    this.pendingCancelId.set(null);
    this.actionError.set(null);
    this.actionSuccess.set(null);
    await Promise.all([this.loadAvailability(), this.loadBookings()]);
  }

  onSetupChanged(): void {
    if (this.hasActiveRequest()) return;
    this.clearQueryState();
    this.actionError.set(null);
    this.actionSuccess.set(null);
  }

  private async loadAvailability(): Promise<void> {
    this.loadingAvailability.set(true);
    this.availabilityError.set(null);
    this.slots.set([]);
    try {
      const res = await firstValueFrom(
        this.http.get<AvailabilityResponse>(
          `${API}/laundry-rooms/${this.laundryRoomId}/availability?date=${this.date}`,
        ),
      );
      this.slots.set(res.slots);
    } catch (err) {
      this.availabilityError.set(this.extractError(err));
    } finally {
      this.loadingAvailability.set(false);
    }
  }

  private async loadBookings(): Promise<void> {
    this.loadingBookings.set(true);
    this.bookingsError.set(null);
    try {
      const res = await firstValueFrom(
        this.http.get<BookingsResponse>(
          `${API}/bookings?laundryRoomId=${this.laundryRoomId}&date=${this.date}`,
        ),
      );
      this.bookings.set(res.items);
    } catch (err) {
      this.bookingsError.set(this.extractError(err));
    } finally {
      this.loadingBookings.set(false);
    }
  }

  async createBooking(slot: Slot): Promise<void> {
    const validation = this.bookingValidationMessage();
    if (validation) {
      this.actionSuccess.set(null);
      this.actionError.set(validation);
      return;
    }
    const start = this.slotStart(slot.startTime);
    this.bookingSlotStart.set(start);
    this.pendingCancelId.set(null);
    this.actionError.set(null);
    this.actionSuccess.set(null);
    try {
      await firstValueFrom(
        this.http.post(`${API}/bookings`, {
          residentId: this.residentId,
          laundryRoomId: this.laundryRoomId,
          date: this.date,
          slotStart: start,
        }),
      );
      this.actionSuccess.set(
        `Booking created for ${this.formatTime(slot.startTime)}-${this.formatTime(slot.endTime)}.`,
      );
      this.selectedSlotStart.set(null);
      await Promise.all([this.loadAvailability(), this.loadBookings()]);
    } catch (err) {
      this.actionError.set(this.extractError(err));
    } finally {
      this.bookingSlotStart.set(null);
    }
  }

  requestCancelBooking(bookingId: string): void {
    if (this.hasActiveRequest()) return;
    this.selectedSlotStart.set(null);
    this.pendingCancelId.set(bookingId);
    this.actionError.set(null);
    this.actionSuccess.set(null);
  }

  keepBooking(): void {
    if (this.cancelingId() !== null) return;
    this.pendingCancelId.set(null);
  }

  async cancelBooking(bookingId: string): Promise<void> {
    this.cancelingId.set(bookingId);
    this.pendingCancelId.set(null);
    this.selectedSlotStart.set(null);
    this.actionError.set(null);
    this.actionSuccess.set(null);
    try {
      await firstValueFrom(this.http.post(`${API}/bookings/${bookingId}/cancel`, {}));
      this.actionSuccess.set('Booking canceled. The time slot has been refreshed.');
      await Promise.all([this.loadAvailability(), this.loadBookings()]);
    } catch (err) {
      this.actionError.set(this.extractError(err));
    } finally {
      this.cancelingId.set(null);
    }
  }

  private clearQueryState(): void {
    this.hasQueried.set(false);
    this.slots.set([]);
    this.bookings.set([]);
    this.selectedSlotStart.set(null);
    this.pendingCancelId.set(null);
    this.availabilityError.set(null);
    this.bookingsError.set(null);
  }

  private extractError(err: unknown): string {
    if (err instanceof HttpErrorResponse) {
      const body = err.error as { message?: string } | null;
      if (body?.message) return body.message;
      return `Error ${err.status}: ${err.statusText}`;
    }
    return 'Unexpected error.';
  }
}
