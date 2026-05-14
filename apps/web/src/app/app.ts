import { Component, inject, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

const API = '/api';
const TIMEZONE = 'Europe/Stockholm';

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

  slots = signal<Slot[]>([]);
  bookings = signal<Booking[]>([]);
  hasQueried = signal(false);

  loadingAvailability = signal(false);
  loadingBookings = signal(false);
  bookingSlotStart = signal<string | null>(null);
  cancelingId = signal<string | null>(null);

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

  async load(): Promise<void> {
    if (!this.laundryRoomId.trim() || !this.date) return;
    this.hasQueried.set(true);
    this.actionError.set(null);
    this.actionSuccess.set(null);
    await Promise.all([this.loadAvailability(), this.loadBookings()]);
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
    const start = this.slotStart(slot.startTime);
    this.bookingSlotStart.set(start);
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
        `Booking created: ${this.formatTime(slot.startTime)}–${this.formatTime(slot.endTime)}.`,
      );
      await Promise.all([this.loadAvailability(), this.loadBookings()]);
    } catch (err) {
      this.actionError.set(this.extractError(err));
    } finally {
      this.bookingSlotStart.set(null);
    }
  }

  async cancelBooking(bookingId: string): Promise<void> {
    this.cancelingId.set(bookingId);
    this.actionError.set(null);
    this.actionSuccess.set(null);
    try {
      await firstValueFrom(this.http.post(`${API}/bookings/${bookingId}/cancel`, {}));
      this.actionSuccess.set('Booking canceled.');
      await Promise.all([this.loadAvailability(), this.loadBookings()]);
    } catch (err) {
      this.actionError.set(this.extractError(err));
    } finally {
      this.cancelingId.set(null);
    }
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
