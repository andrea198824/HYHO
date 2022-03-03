import { Send } from "@material-ui/icons";
import style from "./newsletter.module.css";

const Newsletter = () => {
    return (
      <div>
        <h1>Newsletter</h1>
        <p>Get timely updates from your favorite products.</p>
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
  