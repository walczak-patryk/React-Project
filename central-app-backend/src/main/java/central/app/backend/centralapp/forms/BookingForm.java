package central.app.backend.centralapp.forms;

import central.app.backend.centralapp.models.Booking;

import java.time.LocalDate;

public class BookingForm extends Booking {
    private String username;

    public String getUsername() { return this.username; }

    public void setUsername(String username) { this.username = username;}

    public int getId() {
        return super.getId();
    }

    public void setId(int id) { super.setId(id); }

    public int getOwner() { return super.getOwner(); }

    public void setOwner(int owner) { super.setOwner(owner); }

    public LocalDate getStartDateTime() { return super.getStartDateTime();}

    public void setStartDateTime(LocalDate startDateTime) { super.setStartDateTime(startDateTime); }

    public boolean getActive() { return super.getActive(); }

    public void setActive(boolean active) { super.setActive(active); }

    public int getItemId() { return super.getItemId(); }

    public void setItemId(int itemId) { super.setItemId(itemId); }

    public String getItemType() { return super.getItemType(); }

    public void setItemType(String itemType) { super.setItemType(itemType); }

    public String getDetails() { return super.getDetails(); }

    public void setDetails(String details) { super.setDetails(details); }

    BookingForm(){}

    public BookingForm(Booking booking, String username){
        super(booking);
        this.username = username;
    }

}
