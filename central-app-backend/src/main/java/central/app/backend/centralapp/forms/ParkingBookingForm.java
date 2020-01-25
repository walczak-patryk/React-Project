package central.app.backend.centralapp.forms;

import java.time.LocalDateTime;

public class ParkingBookingForm {
    private long id;
    private int parkingId;
    private int parkingSpotId;
    private LocalDateTime bookDate;
    private int paidAmount;
    private LocalDateTime startDate;
    private LocalDateTime endDate;

    public long getId() { return this.id; }

    public void setId(int id) { this.id = id; }

    public long getParkingId() { return this.parkingId; }

    public void setParkingId(int parkingId) { this.parkingId = parkingId; }

    public long getParkingSpotId() { return this.parkingSpotId; }

    public void setParkingSpotId(int parkingSpotId) { this.parkingSpotId = parkingSpotId; }

    public LocalDateTime getBookDate() { return this.bookDate; }

    public void setBookDate(LocalDateTime bookDate) { this.bookDate = bookDate; }

    public int getPaidAmount() { return this.paidAmount; }

    public void setPaidAmount(int paidAmount) { this.paidAmount = paidAmount; }

    public LocalDateTime getStartDate() { return this.startDate; }

    public void setStartDate(LocalDateTime startDate) { this.startDate = startDate; }

    public LocalDateTime getEndDate() { return this.endDate; }

    public void setEndDate(LocalDateTime endDate) { this.endDate = endDate; }

}

