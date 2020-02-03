package central.app.backend.centralapp.forms.parklyForms;

public class ParklyForm {
    private int id;
    private String name;
    private String city;
    private String zip;
    private String address;
    private int price;
    private String description;
    private int nspots;
    private boolean is247;
    private boolean active;

    ParklyForm() {}

    public int getId() { return this.id; }
    public String getName() { return  this.name; }
    public String getCity() { return  this.city; }
    public String getZip() { return  this.zip; }
    public String getAddress() { return  this.address; }
    public String getDescription() { return  this.description; }
    public int getPrice() { return  this.price; }
    public int getNspots() { return  this.nspots; }
    public boolean get247() { return  this.is247; }
    public boolean getActive() { return  this.active; }
}
