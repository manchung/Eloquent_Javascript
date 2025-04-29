var roads = [
    "Alice's House-Bob's House",   "Alice's House-Cabin",
    "Alice's House-Post Office",   "Bob's House-Town Hall",
    "Daria's House-Ernie's House", "Daria's House-Town Hall",
    "Ernie's House-Grete's House", "Grete's House-Farm",
    "Grete's House-Shop",          "Marketplace-Farm",
    "Marketplace-Post Office",     "Marketplace-Shop",
    "Marketplace-Town Hall",       "Shop-Town Hall"
  ];
  
  function buildGraph(edges) {
    let graph = Object.create(null);
    function addEdge(from, to) {
      if (from in graph) {
        graph[from].push(to);
      } else {
        graph[from] = [to];
      }
    }
    for (let [from, to] of edges.map(r => r.split("-"))) {
      addEdge(from, to);
      addEdge(to, from);
    }
    return graph;
  }
  
  var roadGraph = buildGraph(roads);
  
  var VillageState = class VillageState {
    constructor(place, parcels) {
      this.place = place;
      this.parcels = parcels;
    }
  
    move(destination) {
      if (!roadGraph[this.place].includes(destination)) {
        return this;
      } else {
        let parcels = this.parcels.map(p => {
          if (p.place != this.place) return p;
          return {place: destination, address: p.address};
        }).filter(p => p.place != p.address);
        return new VillageState(destination, parcels);
      }
    }
  }
  
  function runRobot(state, robot, memory) {
    for (let turn = 0;; turn++) {
      if (state.parcels.length == 0) {
        console.log(`Done in ${turn} turns`);
        break;
      }
      let action = robot(state, memory);
      state = state.move(action.direction);
      memory = action.memory;
      console.log(`Moved to ${action.direction}`);
    }
  }
  
  function randomPick(array) {
    let choice = Math.floor(Math.random() * array.length);
    return array[choice];
  }
  
  function randomRobot(state) {
    return {direction: randomPick(roadGraph[state.place])};
  }
  
  VillageState.random = function(parcelCount = 5) {
    let parcels = [];
    for (let i = 0; i < parcelCount; i++) {
      let address = randomPick(Object.keys(roadGraph));
      let place;
      do {
        place = randomPick(Object.keys(roadGraph));
      } while (place == address);
      parcels.push({place, address});
    }
    return new VillageState("Post Office", parcels);
  };
  
  var mailRoute = [
    "Alice's House", "Cabin", "Alice's House", "Bob's House",
    "Town Hall", "Daria's House", "Ernie's House",
    "Grete's House", "Shop", "Grete's House", "Farm",
    "Marketplace", "Post Office"
  ];
  
  function routeRobot(state, memory) {
    if (memory.length == 0) {
      memory = mailRoute;
    }
    return {direction: memory[0], memory: memory.slice(1)};
  }
  
  function findRoute(graph, from, to) {
    let work = [{at: from, route: []}];
    for (let i = 0; i < work.length; i++) {
      let {at, route} = work[i];
      for (let place of graph[at]) {
        if (place == to) return route.concat(place);
        if (!work.some(w => w.at == place)) {
          work.push({at: place, route: route.concat(place)});
        }
      }
    }
  }
  
  function goalOrientedRobot({place, parcels}, route) {
    if (route.length == 0) {
      let parcel = parcels[0];
      if (parcel.place != place) {
        route = findRoute(roadGraph, place, parcel.place);
      } else {
        route = findRoute(roadGraph, place, parcel.address);
      }
    }
    return {direction: route[0], memory: route.slice(1)};
  }

//   function compareRobts()

function measureRobot(state, robot, memory) {
    let turn = 0
    for (;; turn++) {
      if (state.parcels.length == 0) {
        // console.log(`Done in ${turn} turns`);
        break;
      }
      let action = robot(state, memory);
      state = state.move(action.direction);
      memory = action.memory;
    //   console.log(`Moved to ${action.direction}`);
    }
    return turn;
}

function compareRobot(robot_1, robot_2, n_tries=100) {
    let robot_1_steps = 0;
    let robot_2_steps = 0;
    for (let i=0; i<n_tries; i++) {
        let n_parcels = Math.floor(Math.random()*10);
        let state = VillageState.random(n_parcels);
        robot_1_steps += measureRobot(state, robot_1, []);
        robot_2_steps += measureRobot(state, robot_2, []); 
    }
    console.log(`${robot_1.name} avg steps: ${robot_1_steps/n_tries} \n${robot_2.name} avg steps: ${robot_2_steps/n_tries}`)
    console.log(`${robot_1_steps < robot_2_steps? robot_1.name : robot_2.name} wins!`)
}
// compareRobot(routeRobot, goalOrientedRobot)
// compareRobot(randomRobot, routeRobot)

function computeDistances(road_graph) {
    let distances = Object.create(null);
    let nodes = Object.keys(road_graph);
    for (let node of nodes) {
        distances[node] = Object.create(null)
    }
    for (let from of nodes) {
        for (let to of nodes) {
            // if (from == to) continue;
            // console.log(`from: ${from}  to: ${to}`)
            let route = findRoute(road_graph, from, to);
            distances[from][to] = route.length;
        }
    }
    for (let node of nodes) {
        distances[node][node] = 0;
    }
    return distances;
}
const distances = computeDistances(roadGraph);
// console.log(distances)

function greedyGoalRobot({place, parcels}, route) {
    if (route.length == 0) {
        let origins = parcels.filter(p => p.place != place).map(p => p.place);
        let destinations = parcels.filter(p => p.place == place).map(p => p.address);
        let places = origins.concat(destinations);
        // console.log(`origins: ${origins}`);
        // console.log(`destinations: ${destinations}`);
        // console.log(`places: ${places}`);
        let closest_place = places.reduce((a, b) => distances[place][a] < distances[place][b] ? a : b);
        // console.log(`closest_place from ${place}: ${closest_place}`);
        route = findRoute(roadGraph, place, closest_place);
    }
    return {direction: route[0], memory: route.slice(1)};
}

// runRobot(VillageState.random(5), greedyGoalRobot, [])
// compareRobot(routeRobot, goalOrientedRobot)
// compareRobot(randomRobot, routeRobot)
compareRobot(greedyGoalRobot, randomRobot);
console.log('\n');
compareRobot(greedyGoalRobot, routeRobot);
console.log('\n');
compareRobot(greedyGoalRobot, goalOrientedRobot);