# Promise
* Promise => Assurance of a work that could be completed in future
* Future value inside that promise is determined by the function that return the promise
* Promise => Initial state -> Pending ; value => undefined
            Final state -> Settled
                resolved -> you have got the future value
                rejected -> errr
*  to consume a promise we have two **Synchronous function** then and catch
They are used to register cb function on that promise
* cb functions are passed inside then and catch are **async** (kindof Node thing)
* promise can only be rejected or resolved once in a lifetime
* every then and catch also returns a promise
* the promise returned from that then depends upon the cb function inside that then
* final state of promise returned from then/catch depends upon value returned from there cb => if cb returns then your promise will resolve into 
                val => val 
                nothing => undefined 
                promise => promise