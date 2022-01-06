import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);
      setError(null);
      const mealsFetched = [];

      const response = await fetch(
        "https://react-meals-12cbb-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        throw new Error("Something went Wrong!");
      }

      const responseData = await response.json();

      for (const mealId in responseData) {
        const mealOBJ = {
          id: mealId,
          name: responseData[mealId].name,
          description: responseData[mealId].description,
          price: responseData[mealId].price,
        };
        mealsFetched.push(mealOBJ);
      }
      setMeals(mealsFetched);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setError(error.message);
      setIsLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <section className={classes.loading}>
        <p>LOADING</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className={classes.mealError}>
        <p>{error}</p>
      </section>
    );
  }
  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
