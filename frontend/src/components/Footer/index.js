import "./Footer.css"

const Footer = () =>{
    return (
        <div className='footer-main-container'>
          {/* testing */}
          <div>
            Ruidan Zhang © 2023 <a href = "https://github.com/Ruidan-Zhang" target="_blank" className='log-in-footer-icon' rel="noopener noreferrer"><i class="fa-brands fa-github"></i> </a>
            <a href = "https://www.linkedin.com/in/ruidan-meredith-zhang/" target="_blank" className='log-in-footer-icon' rel="noopener noreferrer"><i class="fa-brands fa-linkedin"></i></a>
          </div>
          <div>
            Javascript | Express | React | Redux | SqlAlchemy | PostgresSQL | HTML | CSS | AWS | Hosted on Render
          </div>
        </div>
    )
};

export default Footer;
