const express = require("express");

const { emitter, emitted } = require("../../system/component/class.events.js");
const CappedArray = require("./class.cappedArray.js");

const MAX_EVENTS = 100 * 10 * 24;
const HISTORY = new Map();


module.exports = (self, logger, init) => {
    return init([
    ], (scope, []) => {

        // TODO/NOTES:
        // - add SCENES changes/index/progress
        // - save hisotry every x seconds to hdd
        // - add store intents
        //   - configure hdd save secondes
        //   - configure max events size

        const app = express();
        const server = self.httpServer(app);


        server.once("listening", () => {
            logger.info(`Ready to serve some stats on http://<host>:<port>/api/plugins/${self._id}/proxy/[info/data]`);
        });


        app.get("/info", (req, res) => {
            res.json({
                max: MAX_EVENTS,
                size: {
                    keys: HISTORY.size,
                }
            });
        });


        app.get("/data", (req, res) => {
            res.json(Object.fromEntries(HISTORY));
        });


        app.get("/data/:state", (req, res) => {

            // return empty array 
            // maybe data is stored later, if 404 grafana says "no data"
            if (!HISTORY.has(req.params?.state)) {
                return res.json([]);
            }

            res.json(HISTORY.get(req?.params?.state));

        });


        emitter.on(emitted, ({ component, event, args: [state] }) => {
            if (component === "endpoints" && event === "state") {

                let key = state._id;

                if (!HISTORY.has(key)) {

                    logger.debug("State has no capped array, create one", state);
                    HISTORY.set(key, new CappedArray(MAX_EVENTS));

                }

                let events = HISTORY.get(key);

                logger.debug("Store state event", state);

                events.add({
                    _id: state._id,
                    name: state.name,
                    value: state.value,
                    timestamp: Date.now()
                });

                logger.verbose("HISTORY", HISTORY);

            }
        });


    });
};