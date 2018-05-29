const jsonfile = require('jsonfile');
const fs = require('fs');
const path = require('path');
const alasql = require('alasql');

function returnEvents(startDate, endDate, aggregation, platform, product) {
    let allEvents = [];

    switch (platform) {
        case "All":
            dirs = fs.readdirSync('./bin/Datasets/Events/');
            for (let index = 0; index < dirs.length; index++) {

                files = fs.readdirSync('./bin/Datasets/Events/' + dirs[index]);

                (function () {
                    for (let i = 0; i < files.length; i++) {
                        const file = files[i];

                        let contents = JSON.parse(fs.readFileSync('./bin/Datasets/Events/' + dirs[index] + '/' + file));

                        for (let z = 0; z < contents.length; z++) {

                            let eventType = contents[z].events[0].event_type;
                            let eventDate = String(contents[z].events[0].data.timestamp_unixtime_ms).substring(0, 10);
                            if (eventType == "custom_event" && (eventDate >= startDate && eventDate <= endDate)) {
                                allEvents.push({
                                    platform: dirs[index],
                                    product: contents[z].events[0].data.event_name,
                                    timestamp: parseInt(eventDate),
                                    d_partition: String(Math.floor(parseInt(eventDate) / (60 * aggregation))),
                                    quantity: 1
                                });
                            };
                        };
                    }

                })();
            }
            return summarizeEvents(allEvents);
            break;

        case "iOS":
            files = fs.readdirSync('./bin/Datasets/Events/iOS');

            (function () {
                for (let index = 0; index < files.length; index++) {
                    const file = files[index];
                    let contents = JSON.parse(fs.readFileSync('./bin/Datasets/Events/iOS/' + file));

                    for (let i = 0; i < contents.length; i++) {

                        let eventType = contents[i].events[0].event_type;
                        let eventDate = String(contents[i].events[0].data.timestamp_unixtime_ms).substring(0, 10);
                        if (eventType == "custom_event" && (eventDate >= startDate && eventDate <= endDate)) {
                            allEvents.push({
                                platform: 'iOS',
                                product: contents[i].events[0].data.event_name,
                                timestamp: parseInt(eventDate),
                                d_partition: String(Math.floor(parseInt(eventDate) / (60 * aggregation))),
                                quantity: 1
                            });
                        };
                    };
                }

            })();
            return summarizeEvents(allEvents);
            break;  

        case "Android":
            files = fs.readdirSync('./bin/Datasets/Events/Android');

            (function () {
                for (let index = 0; index < files.length; index++) {
                    const file = files[index];
                    let contents = JSON.parse(fs.readFileSync('./bin/Datasets/Events/Android/' + file));

                    for (let i = 0; i < contents.length; i++) {

                        let eventType = contents[i].events[0].event_type;
                        let eventDate = String(contents[i].events[0].data.timestamp_unixtime_ms).substring(0, 10);
                        if (eventType == "custom_event" && (eventDate >= startDate && eventDate <= endDate)) {
                            allEvents.push({
                                platform: 'Android',
                                product: contents[i].events[0].data.event_name,
                                timestamp: parseInt(eventDate),
                                d_partition: String(Math.floor(parseInt(eventDate) / (60 * aggregation))),
                                quantity: 1
                            });
                        };
                    };
                }

            })();
            return summarizeEvents(allEvents);
            break;

        case "MobileWeb":
            files = fs.readdirSync('./bin/Datasets/Events/MobileWeb');

            (function () {
                for (let index = 0; index < files.length; index++) {
                    const file = files[index];
                    let contents = JSON.parse(fs.readFileSync('./bin/Datasets/Events/MobileWeb/' + file));

                    for (let i = 0; i < contents.length; i++) {

                        let eventType = contents[i].events[0].event_type;
                        let eventDate = String(contents[i].events[0].data.timestamp_unixtime_ms).substring(0, 10);
                        if (eventType == "custom_event" && (eventDate >= startDate && eventDate <= endDate)) {
                            allEvents.push({
                                platform: 'MobileWeb',
                                product: contents[i].events[0].data.event_name,
                                timestamp: parseInt(eventDate),
                                d_partition: String(Math.floor(parseInt(eventDate) / (60 * aggregation))),
                                quantity: 1
                            });
                        };
                    };
                }

            })();
            return summarizeEvents(allEvents);
            break;

        default:
            console.log("Not a valid Platform. Please, try again");
    }
};

function summarizeEvents(allEvents) {

    var result = alasql(
        'SELECT d_partition AS d_Partition, platform as d_Platform, SUM(quantity) AS d_TotalEvents \
          FROM ? \
         GROUP BY d_partition, platform', 
         [allEvents]
    );

    return result;
}

module.exports = returnEvents;