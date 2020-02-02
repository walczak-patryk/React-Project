import React from 'react';
import '../css/Footer.css'
import 'bootstrap/dist/css/bootstrap.min.css';

class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <footer className="page-footer small">
                <div className="bg-dark footerF container-fluid pt-4 text-white">
                    <div class="row ">
                        <div class="col-md-4 text-left">
                            <h5 class="text-uppercase">About</h5>
                            <p>This is <b>Bookly</b> web app created for <i>Programming multilayered and mobile apps based on React</i> project.</p>
                        </div>
                        <div class="col-md-4">
                            <h5 class="text-uppercase">Contact</h5>
                            <ul class="list-unstyled">
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
                        <div class="col-md-4 text-right">
                            <h5 class="text-uppercase">Project information</h5>
                            <ul class="list-unstyled">
                                <li>
                                    <a href="https://react.edu.pl/pw/2019/10/01/project/">react.edu.pl/pw/</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <hr size="5" style={{ marginTop: "0" }} />
                    <div class="footer-copyright text-center footerCPYR">© 2020 Copyright:
                        <a href="https://minibookly.netlify.com/"> miniBookly.netlify.com</a>
                    </div>
                </div>

            </footer>
        )
    }
}

export default Footer
