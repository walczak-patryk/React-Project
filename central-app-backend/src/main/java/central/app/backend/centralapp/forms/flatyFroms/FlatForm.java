package central.app.backend.centralapp.forms.flatyFroms;

import java.sql.Time;
import java.util.Date;
import java.util.HashSet;

public class FlatForm {
    private Long id;
    private int owner_of_room;
    private String name_of_room;
    private Date start_date;
    private char active;
    private Date end_date;
    private String description;
    private String city;
    private String street;
    private String number_of_street;
    private String number_of_block;
    private String zip_code;
    private String country;
    private int price;
    private Time check_in_from;
    private Time check_in_to;
    private Time check_out;
    private int limit_of_quests;
//    private ImageEntity room_image;
//    Set<PaymentMethodsEntity> payment_methods = new HashSet<>();
//    private Set<BookingEntity> room_bookings;
}