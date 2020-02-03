import React from 'react';
import '../css/Footer.css'
import 'bootstrap/dist/css/bootstrap.min.css';

class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <footer className="footerFF small">
                <div className="bg-dark footerF container-fluid pt-4 text-white">
                    <div className="row ">
                        <div className="col-md-4 text-left">
                            <h5 className="text-uppercase">About</h5>
                            <p style={{textAlign: "justify"}}>This is <b>Bookly</b> web app created for
                                <i> Programming multilayered and mobile apps based on React</i> project.
                                It imitates bookings online page allowing an admin to look into history
                                of bookings for the <b>Bookly</b> service.
                            </p>
                        </div>
                        <div className="col-md-4">
                            <h5 className="text-uppercase">Contact</h5>
                            <ul className="list-unstyled">
                                <li>
                                    Phone number:
                                    <a href="callto: 123456789"> 123456789</a>
                                </li>
                                <li>
                                    Email:
                                    <a href="mailto: s.majorek@bookly.com"> s.majorek@bookly.com</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-4 text-right">
                            <h5 className="text-uppercase">Project information</h5>
                            <ul className="list-unstyled">
                                <li>
                                    <a href="https://react.edu.pl/pw/2019/10/01/project/">react.edu.pl/pw/</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <hr size="5" style={{ marginTop: "0" }} />
                    <div className="footer-copyright text-center footerCPYR">© 2020 Copyright:
                        <a href="https://minibookly.netlify.com/"> miniBookly.netlify.com</a>
                    </div>
                </div>

            </footer>
        )
    }
}

export default Footer
