import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isSixChars = (value) => value.trim().length === 6;

const Checkout = (props) => {
    const [formInputValidity , setFormInputValidity] = useState({
        name:true,
        street:true,
        postalCode:true,
        city:true
    });

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef = useRef();


    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostalCode = postalCodeInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const nameIsValid = !isEmpty(enteredName);
        const streetIsValid = !isEmpty(enteredStreet);
        const postalCodeIsValid = isSixChars(enteredPostalCode);
        const cityIsValid = !isEmpty(enteredCity);

        setFormInputValidity({
            name:nameIsValid,
            street:streetIsValid,
            postalCode:postalCodeIsValid,
            city:cityIsValid
        });


        const formIsValid = nameIsValid && streetIsValid && postalCodeIsValid && cityIsValid;

        if (!formIsValid){
            return
        }

        props.onConfirm({
          name:enteredName,
          street:enteredStreet,
          postalCode:enteredPostalCode,
          city:enteredCity
        })

    }

    const nameInputClass = `${classes.control} ${!formInputValidity.name && classes.invalid}`;
    const streetInputClass = `${classes.control} ${!formInputValidity.street && classes.invalid}`;
    const postalCodeInputClass = `${classes.control} ${!formInputValidity.postalCode && classes.invalid}`;
    const cityInputClass = `${classes.control} ${!formInputValidity.city && classes.invalid}`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameInputClass}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef}/>
        {!formInputValidity.name && <p>Please enter a valid Name</p>}
      </div>
      <div className={streetInputClass}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputValidity.street && <p>Please enter a valid Street</p>}
      </div>
      <div className={postalCodeInputClass}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalCodeInputRef} />
        {!formInputValidity.postalCode && <p>Please enter a valid Postal Code</p>}
      </div>
      <div className={cityInputClass}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputValidity.city && <p>Please enter a valid City</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>Cancel</button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
