//starter code v1.1 - tutorial with some additional basic functionality

var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var controlTower = require('control.tower');

module.exports.loop = function () {

    //temporary safemode catastrophy failsafe during defense development....
    var hostiles = Game.spawns['HSSpawn'].room.find(FIND_HOSTILE_CREEPS);
    if (hostiles.length > 0) {
        Game.spawns['HSSpawn'].room.controller.activateSafeMode();
    }
    //remove above code to fallback in defense module if all else fails once basic defense module developed

    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existent creep memory: ' + name);
        }
    }
    //check # of harverster creeps and spawn new basic harvester if less than 3
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    console.log('Harvesters: ' + harvesters.length);

    if (harvesters.length < 3) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['HSSpawn'].spawnCreep([WORK, CARRY, MOVE], newName,
            { memory: { role: 'harvester' } });
    }
    //check # of builder creeps and spawn new basic builder if less than 3
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    console.log('Builders: ' + builders.length);

    if (builders.length < 3) {
        var newName = 'Builder' + Game.time;
        console.log('Spawning new builder: ' + newName);
        Game.spawns['HSSpawn'].spawnCreep([WORK, CARRY, MOVE], newName,
            { memory: { role: 'builder' } });
    }
    //check # of upgrader creeps and spawn new basic upgrader if less than 3
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    console.log('Upgraders: ' + builders.length);

    if (upgraders.length < 3) {
        var newName = 'Upgrader' + Game.time;
        console.log('Spawning new Upgrader: ' + newName);
        Game.spawns['HSSpawn'].spawnCreep([WORK, CARRY, MOVE], newName,
            { memory: { role: 'upgrader' } });
    }
    //call roll function modules for each existing creep based on role assignment in memory
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }

    }
    //trigger towers
    controlTower.run();
}