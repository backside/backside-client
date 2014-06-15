Backside Javascript Client
==========================

To build, run `npm run build`.

## Basic Use

    var ref = new Backside('http://localhost:5000');
    ref.on('value', function(snapshot) {
      console.log(snapshot.val());
    });