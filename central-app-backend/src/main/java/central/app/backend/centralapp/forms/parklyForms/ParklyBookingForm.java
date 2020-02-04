package central.app.backend.centralapp.forms.parklyForms;

import java.time.LocalDateTime;

public class ParklyBookingForm {

    private long id;
    private int parkingId;
    private int parkingSpotId;
    private int userId;
    private LocalDateTime bookDate;
    private int paidAmount;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private boolean active;

    public int getParkingId() {return parkingId;}
    public int getParkingSpotId() {return parkingSpotId; }
    public LocalDateTime getStartDate() { return startDate; }
    public LocalDateTime getEndDate() { return endDate; }
    public LocalDateTime getBookDate() {return bookDate;}
    public Long getId() { return id; }
    public int getUserId() {return userId;}
    public int getPaidAmount() {return paidAmount;}
    public boolean getActive() {return active;}


    @Override
    public String toString() {
        return "{" +
                "\"parkingSpotId\":{\"id\":\""+this.parkingSpotId+"\"},"+
                "\"parkingId\":{ \"id\":\""+this.parkingId+"\"},"+
                "\"active\":\""+this.active+"\","+
                "\"bookDate\":\""+this.bookDate+"\","+
                "\"startDate\":\""+this.startDate+"\","+
                "\"endDate\":\""+this.endDate+"\","+
                "\"userId\":\""+this.userId+"\","+
                "\"paidAmount\":\""+this.paidAmount+"\""+
            "}";
    }
}

