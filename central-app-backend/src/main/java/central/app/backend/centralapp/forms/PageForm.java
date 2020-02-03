package central.app.backend.centralapp.forms;

import java.util.List;

public class PageForm {
    private List<BookingForm> bookingForms;
    private int maxSize;
    private boolean isNext;

    public List<BookingForm> getBookingForms() { return this.bookingForms; }

    public void setBookingForms(List<BookingForm> bookingForms) {
        this.bookingForms = bookingForms;
    }

    public int getMaxSize() { return this.maxSize; }

    public void setMaxSize(int maxSize) { this.maxSize = maxSize; }

    public boolean getIsNext() { return this.isNext; }

    public void setIsNext(boolean isNext) {
        this.isNext = isNext;
    }

    PageForm(){}

    public PageForm(List<BookingForm> bookingForms, int maxSize, boolean isNext){
        this.bookingForms = bookingForms;
        this.maxSize = maxSize;
        this.isNext = isNext;
    }

}
