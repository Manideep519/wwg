import { Button, Container, Title } from "@mantine/core";
import classes from "./Home.module.css";
import { Link } from "react-router-dom";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import Wrapper from "../Wrapper/Wrapper";
const Home = () => {
  return (
    <Wrapper>
      <div className={classes.bg}>
        <Container className={classes.home}>
          <Title top={1} className={classes.title}>
            Craft Your Dream Wedding Website, <br />
            Seamlessly
          </Title>
          <Link className={classes.button} to={"/login"}>
            <Button component="div" size="lg">
              Get Started
            </Button>
          </Link>
        </Container>
      </div>
    </Wrapper>
  );
};

export default Home;
