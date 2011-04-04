// 
//  jquery.profiler.js
//  
//  Copyright 2011 Andrew Okonetchnikov. All rights reserved.
// 

(function($){
  
  /**
   * class Profiler < Object
   * 
   * Use $.profiler to interact with singleton instance of this class.
   * 
   **/
  function Profiler() {
    this._options = {};
    this._profiler = [];
  }
  
  $.extend(Profiler.prototype, {
    
    /**
     * Profiler#lasts(function)
     * 
     * Taks a function as argument and measures the execution time.
     * Puts result in ms to standard console object.
     * 
     **/
    lasts: function(func, name){
      if(!$.isFunction(func)) return; // Proceed only if func is function
      var t0 = new Date();

      var result = func(); // Execute function

      var t1 = new Date();
      var dt = t1-t0;
      if(typeof console !== 'undefined'){console.log('Executing of ' + (name || func.callee) + ' took ' + dt + 'ms')};
      
      return result;
    },
    
    /**
     * Profiler#profile(name)
     * 
     * Simulates console.profile call.
     * Use $.debug.profileEnd(name) with the same name as name to put in console time in ms;
     * 
     **/
    profile: function(name){
      var t0 = new Date();
      if(typeof name !== 'undefined') // Name is defined, so store time as named item
        this._profiler[name] = t0;
      else // Name is not defined. Use standard stack to store time
        this._profiler.push(t0);
    },
    
    /**
     * Profiler#profileEnd(name)
     * 
     * Simulates console.profileEnd(name).
     * Use along with $.debug.profile(name) to measure time between thoose calls;
     * 
     **/
    profileEnd: function(name){
      var t0,
          t1 = new Date(),
          dt;
          
      if(typeof name !== 'undefined') // Name is defined, so use named item to get t0
        t0 = this._profiler[name];
      else // Name is not defined. Use last item from stack
        t0 = this._profiler.pop();
        
      dt = t1 - t0;
      if(typeof console !== 'undefined'){console.log((name || 'Profiler:') + ' ' + dt + 'ms')};
    }
    
  });
  
  // Singleton interface
  $.profiler = new Profiler();
  
})(jQuery || Zepto);