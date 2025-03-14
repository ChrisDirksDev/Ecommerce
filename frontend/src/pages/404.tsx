import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-6xl text-[var(--color-warm-gold)] font-bold">404</h1>
      <p className="text-xl text-[var(--color-muted-gray-brown)] mt-2">
        Oops! Looks like you took a wrong turn.
      </p>
      <img
        src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExN3RpczBtN29ob2FpcXJ4d21rbmp1MTZuN2pkc2ZnczliemhxdGhueCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/UHAYP0FxJOmFBuOiC2/giphy.gif"
        alt="Lost in space"
        className="w-64 h-auto mt-6 rounded-lg shadow-lg"
      />
      <p className="mt-4 text-lg">But don’t worry, you can always go back home!</p>
      <Link
        to="/"
        className="btn btn-primary mt-4"
      >
        Take Me Home
      </Link>
    </div>
  );
};

export default NotFound;
