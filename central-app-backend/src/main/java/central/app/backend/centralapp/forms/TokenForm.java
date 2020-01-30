package central.app.backend.centralapp.forms;

public class TokenForm {
    private String token;

    public String getToken(){
        if(this.token == null) this.token = "";
        return this.token;
    }
}
