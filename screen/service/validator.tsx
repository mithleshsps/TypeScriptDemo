import React from 'react';

export const emailValidation = (text: string) => {
  console.log(text);
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  if (reg.test(text) === false) {
    console.log('Email is Not Correct');
    return false;
  } else {
    return true;
  }
};
