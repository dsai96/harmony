type WelcomeProps = {
    name: string;
}

function Welcome(props: WelcomeProps) {
    return <h1>Hello, {props.name}</h1>;
 }

export default Welcome;