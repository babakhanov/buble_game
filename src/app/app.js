import table from "./table";
import chart from "./chart";

export default (customers, tickCount, tickTime) => {
  var time = 0;
  var point = 0;
  var minHealth = 100;
  var maxHealth = 500;
  var currentTick = tickCount;

  window.clients = _.object(_.map(_.range(0, customers), (index) => {
    return [index + 1, {
      id: index + 1,
      name: `Client ${index + 1}`,
      health: _.random(minHealth, maxHealth),
      questions: 0, // each item takes -3 more health on each tick
      bugs: 0, // each item takes -5 more health on each tick
      requests: 0, // each item takes -4 more health on each tick
      cancelation: false,
      interactedAt: 0,
      lastActive: 0
    }]
  }));

  var randomKey = () => {
    var keys = _.keys(window.clients);
    console.log(keys.length);
    return keys[_.random(0, keys.length - 1)];
  };

  var render = (without) => {
    var data, key;
    if (without && without.length){
      _.each(without, (id) => {
        delete(window.clients[id])
      });
    }
    if (!_.isEmpty(window.clients)){
      key = randomKey();
      window.clients[key].lastActive = tickCount - currentTick;
      window.clients[key][['requests', 'bugs', 'questions'][_.random(0, 2)]]++;
    }
    data = _.sortBy(_.values(window.clients), 'interactedAt');
    table(data);
    chart(data);
  };

  var increaseHealth = (clientId, points) => {
    var _healts = window.clients[clientId].health + points;
    window.clients[clientId].health = _healts < maxHealth ? _healts : maxHealth;
  }

  var solve = {
    bug: (clientId) => {
      window.clients[clientId].bugs--;
      increaseHealth(clientId, 20);
    },
    question: (clientId) => {
      window.clients[clientId].questions--;
      increaseHealth(clientId, 10);
    },
    request: (clientId) => {
      window.clients[clientId].requests--;
      increaseHealth(clientId, 50);
    },
  };

  window.action = (e) => {
    e.preventDefault();
    if (currentTick > 0){
      e.currentTarget.remove();
      var type = e.currentTarget.getAttribute('data-type');
      var clientId = e.currentTarget.getAttribute('data-client-id');
      if (window.clients[clientId]){
        window.clients[clientId].interactedAt = tickCount - currentTick;
        solve[type](clientId);
      }
    }
  };

  var tick = (time) => {
    if (_.isEmpty(window.clients)){
      currentTick = 0;
      alert('game over');
    }else{
      var toRemove = [];
      point = new Date() * 1;
      document.getElementById("tick").innerHTML = currentTick;
      time = tickTime - ((new Date() * 1) - point);
      if (time < 0){
        time = 0;
      }
      currentTick --;
      if (currentTick >= 0){
        _.delay(tick, time);
      }
      _.each(window.clients, (client, index) => {
        client.health--;
        if (client.bugs){
          client.health -= 5;
        }
        if (client.requests){
          client.health -= 3;
        }
        if (client.questions){
          client.health -= 1;
        }
        client.points = client.bugs * 5 + client.requests * 3 + client.questions;
        if (client.health < 100){
          toRemove.push(index);
        }
      });
    }
    render(toRemove);
  };
  _.delay(tick, time);

};

