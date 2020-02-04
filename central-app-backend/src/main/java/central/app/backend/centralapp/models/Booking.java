package central.app.backend.centralapp.models;

import central.app.backend.centralapp.forms.parklyForms.ParklyBookingForm;
import central.app.backend.centralapp.repositories.UserRepository;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;

@Entity
@Table(name = "booking")
@EntityListeners(AuditingEntityListener.class)
public class Booking implements Serializable {

    // columns
    private static final long serialVersionUID = -2343243243242432341L;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column(name = "owner", nullable = false)
    private int owner;

    @Column(name = "start_date_time", nullable = false)
    private LocalDate startDateTime;

    @Column(name = "active", nullable = false)
    private boolean active;

    @Column(name = "item_id", nullable = false)
    private int itemId;

    @Column(name = "item_type", nullable = false)
    private String itemType;

    @Column(name = "details", nullable = false)
    private String details;

    public Booking() {
    }

    public Booking(Booking booking) {
        this.id = booking.id;
        this.owner = booking.owner;
        this.startDateTime = booking.startDateTime;
        this.active = booking.active;
        this.itemId = booking.itemId;
        this.itemType = booking.itemType;
        this.details = booking.details;
    }

    public Booking(int owner, LocalDate startDateTime, boolean active, int itemId, String itemType, String details) {
        this.owner = owner;
        this.startDateTime = startDateTime;
        this.active = active;
        this.itemId = itemId;
        this.itemType = itemType;
        this.details = details;
    }

    public Booking(int id,int owner, LocalDate startDateTime, boolean active, int itemId, String itemType, String details) {
        this.id = id;
        this.owner = owner;
        this.startDateTime = startDateTime;
        this.active = active;
        this.itemId = itemId;
        this.itemType = itemType;
        this.details = details;
    }

    public Booking(ParklyBookingForm parklyBookingForm) {
        this.owner = parklyBookingForm.getUserId();
        this.startDateTime = LocalDate.from(parklyBookingForm.getStartDate());
        this.active = parklyBookingForm.getActive();
        this.itemId = parklyBookingForm.getParkingId();
        this.itemType = "parking";
        this.details = "";
    }



    // setters and getters
    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getOwner() { return this.owner; }

    public void setOwner(int owner) { this.owner = owner; }

    public LocalDate getStartDateTime() { return this.startDateTime; }

    public void setStartDateTime(LocalDate startDateTime) { this.startDateTime = startDateTime; }

    public boolean getActive() { return this.active; }

    public void setActive(boolean active) { this.active = active; }

    public int getItemId() { return this.itemId; }

    public void setItemId(int itemId) { this.itemId = itemId; }

    public String getItemType() { return this.itemType; }

    public void setItemType(String itemType) { this.itemType = itemType; }

    public String getDetails() { return this.details; }

    public void setDetails(String details) { this.details = details; }

    public void setAll(int owner, LocalDate startDateTime, boolean active, int itemId, String itemType, String details) {
        this.owner = owner;
        this.startDateTime = startDateTime;
        this.active = active;
        this.itemId = itemId;
        this.itemType = itemType;
        this.details = details;
    }

    public void setAll(int id, int owner, LocalDate startDateTime, boolean active, int itemId, String itemType, String details) {
        this.id = id;
        this.owner = owner;
        this.startDateTime = startDateTime;
        this.active = active;
        this.itemId = itemId;
        this.itemType = itemType;
        this.details = details;
    }

    public void setAll(Booking booking) {
        this.owner = booking.owner;
        this.startDateTime = booking.startDateTime;
        this.active = booking.active;
        this.itemId = booking.itemId;
        this.itemType = booking.itemType;
        this.details = booking.details;
    }

    @Override
    public String toString() {
        return "{" +",\n"+
                "\"owner\":" + this.owner + ",\n"+
                "\"startDateTime\":" + this.startDateTime + ",\n"+
                "\"active\":" + this.active + ",\n"+
                "\"itemId\":" + this.itemId + ",\n"+
                "\"itemType\":" + this.itemType +",\n"+
                "\"details\":" + this.details +",\n"+
                "}";
    }
}
