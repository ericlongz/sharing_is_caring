module.exports = (
  ctmLikeInJobname,
  ctmJobName,
  ctmLikeInGroupName,
  ctmGroupName,
  ctmLikeInApplication,
  ctmApplication,
  ctmLikeInServer,
  ctmServer,
  ctmLikeInUserId,
  ctmUserId
) => {
  let a = /^\^.{1,}\.\*.{1,}\$$/;
  let b = /^\^\w/;
  let c = /\w\$$/;
  let validationResult = true;

  console.log('Validation Running');
  try {
    if (ctmLikeInJobname === '$regex' && a.test(ctmJobName)) {
      //pass
    } else if (ctmLikeInJobname === '$regex' && b.test(ctmJobName)) {
      //pass
    } else if (ctmLikeInJobname === '$regex' && c.test(ctmJobName)) {
      //pass
    } else if (ctmLikeInJobname === '$regex' && ctmJobName === '') {
      //pass
    } else if (ctmLikeInJobname === '$eq') {
      //pass
    } else {
      validationResult = false;
    }

    if (ctmLikeInServer === '$regex' && a.test(ctmServer)) {
      //pass
    } else if (ctmLikeInServer === '$regex' && b.test(ctmServer)) {
      //pass
    } else if (ctmLikeInServer === '$regex' && c.test(ctmServer)) {
      //pass
    } else if (ctmLikeInServer === '$regex' && ctmServer === '') {
      //pass
    } else if (ctmLikeInServer === '$eq') {
      //pass
    } else {
      validationResult = false;
    }

    if (ctmLikeInUserId === '$regex' && a.test(ctmUserId)) {
      //pass
    } else if (ctmLikeInUserId === '$regex' && b.test(ctmUserId)) {
      //pass
    } else if (ctmLikeInUserId === '$regex' && c.test(ctmUserId)) {
      //pass
    } else if (ctmLikeInUserId === '$regex' && ctmUserId === '') {
      //pass
    } else if (ctmLikeInUserId === '$eq') {
      //pass
    } else {
      validationResult = false;
    }

    if (ctmLikeInGroupName === '$regex' && a.test(ctmGroupName)) {
      //pass
    } else if (ctmLikeInGroupName === '$regex' && b.test(ctmGroupName)) {
      //pass
    } else if (ctmLikeInGroupName === '$regex' && c.test(ctmGroupName)) {
      //pass
    } else if (ctmLikeInGroupName === '$regex' && ctmGroupName === '') {
      //pass
    } else if (ctmLikeInGroupName === '$eq') {
      //pass
    } else {
      validationResult = false;
    }

    if (ctmLikeInApplication === '$regex' && a.test(ctmApplication)) {
      //pass
    } else if (ctmLikeInApplication === '$regex' && b.test(ctmApplication)) {
      //pass
    } else if (ctmLikeInApplication === '$regex' && c.test(ctmApplication)) {
      //pass
    } else if (ctmLikeInApplication === '$regex' && ctmApplication === '') {
      //pass
    } else if (ctmLikeInGroupName === '$eq') {
      //pass
    } else {
      validationResult = false;
    }

    if (
      ctmJobName === '' &&
      ctmGroupName === '' &&
      ctmApplication === '' &&
      ctmServer === '' &&
      ctmUserId === ''
    ) {
      validationResult = false;
    } else {
      //pass
    }
    return validationResult;
  } catch (err) {
    console.log(err);
  }
};
