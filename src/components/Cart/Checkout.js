import { useRef, useState } from 'react';

import classes from './Checkout.module.css';

const isEmpty = (value) => value.trim() === '';
const isFiveChars = (value) => value.trim().length === 6;
const isTenChars = (value) => value.trim().length === 10;

const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    city: true,
    postalCode: true,
    phone:true
  });

  const nameInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();
  const phoneInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredPhoneNumber = phoneInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);
    const enteredPhoneNumberIsValid = isTenChars(enteredPhoneNumber);

    setFormInputsValidity({
      name: enteredNameIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalCodeIsValid,
      phone:enteredPhoneNumberIsValid
    });

    const formIsValid =
      enteredNameIsValid &&

      enteredCityIsValid &&
      enteredPostalCodeIsValid&&
      enteredPhoneNumberIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      city: enteredCity,
      postalCode: enteredPostalCode,
      phone:enteredPhoneNumber
    });
  };

  const nameControlClasses = `${classes.control} ${
    formInputsValidity.name ? '' : classes.invalid
  }`;
  
  const postalCodeControlClasses = `${classes.control} ${
    formInputsValidity.postalCode ? '' : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    formInputsValidity.city ? '' : classes.invalid
  }`;
  const phoneControlClasses = `${classes.control} ${
    formInputsValidity.phone ? '' : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef} />
        {!formInputsValidity.name && <p>Please enter a valid name!</p>}
      </div>
      
      <div className={postalCodeControlClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalCodeInputRef} />
        {!formInputsValidity.postalCode && (
          <p>Please enter a valid postal code (6 characters long)!</p>
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef} />
        {!formInputsValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={phoneControlClasses}>
        <label htmlFor='city'>Phone Number</label>
        <input type='text' id='phone' ref={phoneInputRef} />
        {!formInputsValidity.phone && <p>Please enter 10 digit Mob. Number!</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;