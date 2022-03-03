import { Send } from "@material-ui/icons";

const Newsletter = () => {
    return (
      <div>
        <h1>Noticias</h1>
        <p>Suscribite y enterate de todos lo que logramos con su ayuda</p>
        <div>
          <Input placeholder="Your email" />
          <button>
            <Send />
          </button>
        </div>
      </div>
    );
  };
  
  export default Newsletter;
  