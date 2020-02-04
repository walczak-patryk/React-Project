package central.app.backend.centralapp.forms.parklyForms;

public class ParklySpotForm {
    private int id;
    private ParklyForm parkingId;
    private int placeNumber;
    private int parkingSpotId;

    public int getId() {return id;}
    public void setId(int id) { this.id = id;}
    public ParklyForm getParkingId() { return  parkingId; }
    public void setParkingId(ParklyForm parkingId) { this.parkingId = parkingId; }
    public int getPlaceNumber() {return placeNumber;}
    public void setPlaceNumber(int placeNumber){ this.placeNumber = placeNumber;}
    public int getParkingSpotId() {return parkingSpotId;}
    public void setParkingSpotId(int parkingSpotId){ this.parkingSpotId = parkingSpotId;}

    public ParklySpotForm() {}

}