import sleep from "./utils/sleep";

export default (customers) => {
  var tableTpl = require("../templates/table.jade");
  var time = 0;
  var point = 0;
  var tickCount = 10;
  // each 10 ticks manager gets +1 bonus for each yellow and +2 for each green customers and -1 for each red
  // game takes 600 ticks and could be over if all customers were canceled

  var clients = _.map(_.range(0, customers), (index) => {
    return {
      id: index + 1,
      name: `Client ${index + 1}`,
      health: _.random(100, 500),
      questions: 0, // each item takes -3 more health on each tick
      bugs: 0, // each item takes -5 more health on each tick
      featureRequests: 0, // each item takes -4 more health on each tick
      cancelation: false,
    }
  });

  var tick = (time) => {
    point = new Date() * 1;
    document.getElementById("tick").innerHTML = tickCount;
    time = 1000 - ((new Date() * 1) - point);
    if (time < 0){
      time = 0;
    }
    tickCount --;
    if (tickCount >= 0){
      _.delay(tick, time, 'logged later');
    }
    _.each(clients, (client) => {
      client.health --;
      if (client.bugs){
        client.health -= 3;
      }
    });
    _.times(1, () => {
      clients[_.random(clients.length - 1)].featureRequests++;
    })
    _.times(2, () => {
      clients[_.random(clients.length - 1)].bugs++;
    })
    _.times(3, () => {
      clients[_.random(clients.length - 1)].questions++;
    })

    document.getElementById("container").innerHTML = tableTpl({clients: clients});
  };

  _.delay(tick, time, 'logged later');

};

