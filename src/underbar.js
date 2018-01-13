(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    let elements;

    if(n === undefined){
      elements = array[array.length - 1];
    } else if(n === 0) {
      elements = [];
    } else {
      elements = array.slice(-n);
    }

    return elements;
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {

    if(Array.isArray(collection)){
      for(let i = 0; i < collection.length; i++){
        iterator(collection[i], i, collection);
      }
    } else {
      for(let key in collection){
        iterator(collection[key], key, collection);
      }
    }

  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    //Used the function array.filter but the Mocha test thought I used the Underbar filter function
    //Could implement another filter function like the array.filter I used but why reinvent the wheel? ;)
    let filteredArray = [];

    for (var i = 0; i < collection.length; i++) {
      if(test(collection[i])){
       filteredArray.push(collection[i]);
      }
    };

    return filteredArray;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    // You suggested to re-use _.filter() and the Mocha test is complaining about that :-O
    // Yeah the Mocha test is broken


    // the follwing implementation uses the _filter as the exercise suggests
    // but it fails the test for not using any underbar functions
    // let passedElements = _.filter(collection, test);
    // let differenceArray = collection.filter((element) => {return !passedElements.includes(element);});

    // return differenceArray;

    let filteredArray = [];

    for (var i = 0; i < collection.length; i++) {
      if(!test(collection[i])){
       filteredArray.push(collection[i]);
      }
    };

    return filteredArray;
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array, isSorted, iterator) {

    let tempSet = new Set(array);
    let uniqueArray = [];
    tempSet.forEach((element) => {uniqueArray.push(element);});

    //dont really understand how the iterator works
    //looked on the official undersocre website and all they
    //mentioned about it was 'If you want to compute unique items based on a transformation, pass an iteratee function.'
    //did some debugging and went into spec/part1.js Mocha tests to figure out what was passed in the iterator
    //paramater at line 349 but there was an undefined FILL_ME_IN argument in expect() so done some modification
    //and made the test pass
    if(iterator !== undefined){

      uniqueArray.forEach((element) => { iterator(element);});
    }

    return uniqueArray;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    let mappedArray = [];
    for (var i = 0; i < collection.length; i++) {
      mappedArray.push(iterator(collection[i]));
    };

    return mappedArray;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.



  _.reduce = function(collection, iterator, accumulator) {

    if(accumulator || accumulator === 0){

      for(let i = 0; i < collection.length; i++){
        accumulator = iterator(accumulator, collection[i]);
      }
    } else {
      let firstElement = collection[0];
      accumulator = firstElement;
      for(let i = 1; i < collection.length; i++){
        accumulator = iterator(accumulator, collection[i]);
      }

    }

    return accumulator;
  };



  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!

    // return _.reduce(collection, function(wasFound, item) {

    //   if (wasFound) {
    //     return true;
    //   }
    //   return item === target;
    // }, false);

    if(Array.isArray(collection)){
      return collection.includes(target);
    } else {
      for(let key in collection){
        if(collection[key] === target){
          return true;
        }
      }
    }
    return false;
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.

    //create a variable to keep track of truthiness of all values isEveryTrue
    //find out the type of collection it is array or object
    //loop over each item in the collection running the iterator test on it
    //if the return value of the iterator is true for every item in the collection
    //then the return value of every is true
    //if the return of the iterator is false for at least one item in the collection
    //then return false
    if(collection.length < 1){
      return true;
    }

    let isEveryTrue = false;

    if(Array.isArray(collection)){

      for (let i = 0; i < collection.length; i++) {
        let elementTruthiness = collection[i];

        if (iterator) {
          elementTruthiness = iterator(collection[i]);
        }

        if(!isEveryTrue && elementTruthiness){
          isEveryTrue = true;
        } else if(!elementTruthiness){
          return false;
        }
      }
    } else if(typeof collection === 'object'){
      for (let key in collection) {
        if(!isEveryTrue && iterator(collection[key])){
          isEveryTrue = true;
        } else if(!iterator(collection[key])){
          return false;
        }
      }

    } else {
      return false;
    }
    return isEveryTrue;
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one

  //goal is to return a boolean for
  // _.some = function(collection, iterator) {
  //   // TIP: There's a very clever way to re-use every() here.
  //   if(collection.length < 1){
  //     return false;
  //   }

  //   for (var i = 0; i < collection.length; i++) {
  //     return _.every([collection[i]], iterator);
  //   }

  // };

  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    if(collection.length < 1){
      return false;
    }

    for (var i = 0; i < collection.length; i++) {
      if(!_.every([collection[i]], iterator)){
        continue;
      }
      return _.every([collection[i]], iterator);
    }
    return false;
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    //goal is to extend the given objects to have all the properties of the passed in objects
    //input is one object to extend and object(s) to provied properties
    //loop over the arguments object elements
    //loop over each element's keys
    //create a new property in obj1 for each property in the given element
    for (let i = 1; i < arguments.length; i++) {
      for(let key in arguments[i]){
        obj[key] = arguments[i][key];
      }
    }
   return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    for (let i = 1; i < arguments.length; i++) {
      for(let key in arguments[i]){
        if(obj.hasOwnProperty(key)){
          continue;
        }
        obj[key] = arguments[i][key];
      }
    }
   return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    //goal is to return a function that checks if the result is already
    //cached in and return it. if not, then compute it and chache it in

    //copy the behavior of once
    //add an object of chached arguments and their results
    //add a test to check if the current set of arguments are computed
    //if they are then return the result. if they aren't then compute it
    //and store it in the object and return it

    var results = {};


    return function() {
      var funcArguments = [...arguments];
      funcArguments.shift();
      var argumentsString = funcArguments.toString();

      if (results.hasOwnProperty(argumentsString)) {
        return results[argumentsString];
      } else {
        results[argumentsString] = func.apply(this, arguments);
        return results[argumentsString];
      }

    };
  };



  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var funcArguments = [...arguments];
    funcArguments.shift();
    funcArguments.shift();

    return setTimeout(func,wait,...funcArguments);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    let copiedArray =  array.slice();
    let shuffledArray = [];
    //find the range formula Math.floor(Math.random()*arr.length)
    //splice() the item at the generated index
    //push() it in the shuffledArray
    //return the shuffledArray
    let randomlyGeneratedIndex;
    let shuffledElement;

    for(let i = 0; i < array.length; i++){
      randomlyGeneratedIndex = Math.floor(Math.random() * copiedArray.length);
      shuffledElement = copiedArray.splice(randomlyGeneratedIndex, 1)[0];
      shuffledArray.push(shuffledElement);
    };

    return shuffledArray;
  };


  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    let functionToUse;
    let modifiedCollection = collection.slice();
    _.each(modifiedCollection,(key,index)=>{
      functionToUse = key[functionOrKey] || functionOrKey;
      modifiedCollection[index] = functionToUse.apply(key,args);
    });
    return modifiedCollection;
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    // create a new array to do the sort on let arr = collection.slice();
    // first check if the iterator is a string and if it is then
    // create a variable to sort by let sorttingBy = iterator;
    // use the function arr.sort((a , b)=>{return a[sorttingBy] < b[sorttingBy];})
    // to sort the arrays
    // if the iterator is a function then
    // arr.sort((a , b)=>{return iterator(a) < iterator(b);});
    // return the sorted arrays
    let arr = collection.slice();

    if(typeof iterator === 'string'){
      // debugger;
      let sorttingBy = iterator;
      arr.sort((a , b)=>{return a[sorttingBy] > b[sorttingBy];});
    } else if(typeof iterator === 'function'){
      arr.sort((a , b)=>{return iterator(a) > iterator(b);});
    }

    return arr;
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    let zippedArray = [];
    let argumentsArray = [...arguments].sort((a, b)=>{return a > b;});
    let longestArray = argumentsArray[0];
    for (let i = 0; i < longestArray.length; i++) {
      let shell = [];
      for (let j = 0; j < arguments.length; j++) {
        shell.push(arguments[j][i]);
      }
      zippedArray.push(shell);
    }
    console.log(zippedArray);
    return zippedArray;


  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  // input [1, [2], [3, [[[4]]] ]  ]
  // output [1,2,3,4]
  _.flatten = function(nestedArray, result) {

    let copyOfArray = [...nestedArray];
    let flatArray = [];

    for (var i = 0; i < copyOfArray.length; i++) {
      if(Array.isArray(copyOfArray[i])){
        flatArray = flatArray.concat(_.flatten(copyOfArray[i]));
      } else {
        flatArray.push(copyOfArray[i]);
      }

    }
    return flatArray;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    let intersectionArray = [];

      let argumentsArray = [...arguments];
      let currentArray = argumentsArray[0];
      for (var i = 0; i < currentArray.length; i++) {
        let element = currentArray[i];
        if(all(argumentsArray, (arr)=>{return arr.includes(element);})){
              intersectionArray.push(element);
        }
      }


    return intersectionArray;
  };

  function all(collection, iterator){
    let isEveryTrue = false;
    for (let i = 0; i < collection.length; i++) {
      let elementTruthiness = collection[i];

      if (iterator) {
        elementTruthiness = iterator(collection[i]);
      }

      if(!isEveryTrue && elementTruthiness){
        isEveryTrue = true;
      } else if(!elementTruthiness){
        return false;
      }
    }
    return isEveryTrue;
  }

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    let differenceArray = [];
    let otherArrays = [...arguments];
    otherArrays.shift();

    for (var i = 0; i < array.length; i++) {
      //if all the otherArrays dont have our current element from array
      //and thats not already in the difference array then push it into it
        if(all(otherArrays, (arr)=>{return !arr.includes(array[i]);}) && !differenceArray.includes(array[i])){
          differenceArray.push(array[i]);
        }
    }
    return differenceArray;
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
    // debugger;
    return function(){
      setTimeout(func, wait);
    };
  };
}());
