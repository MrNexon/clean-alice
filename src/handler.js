
import Axios from "axios";

const { reply } = require("alice-renderer");
const { Alice } = require("yandex-dialogs-sdk");

const alice = new Alice();

/*
alice.command(/на завтра/, () => {
    //console.log(ctx.nlu.entities);
    return reply`ok`;
});*/

/*alice.command(/паре/ig, async (ctx) => {
    let date = DateParser.Parse(ctx);
    let name = NameParser.Parse(ctx);
    let by = Group[name];

    if (!name) by = Group.данила;
    console.log(date);

    return reply([await SpeakCompiler.PairFirst(GroupNames[by], date, await DSTU.getRasp(date, by))]);
});

alice.command(/на [а-я]*!/, async (ctx) => {
    let date = DateParser.Parse(ctx);
    /!*let name = NameParser.Parse(ctx);
    let by = Group[name];

    if (!name) by = Group.данила;*!/
    console.log(date);
    //return reply([await SpeakCompiler.Rasp(GroupNames[by], date, await DSTU.getRasp(date, by))]);
});

alice.command('', async (ctx) => {
    return reply`Прив+ет!`;
});*/

alice.any(async (ctx) => {
    let data = await Axios.get('https://cabinet.unimetriq.com/client/b3e7bd77b5e8b89bedcf7d5f57021a84/?nonAuth=1');
    let t = Array.from(data.data.matchAll(/<div class="text-center">[.\s]*([а-я]*)[.\s]*<\/div>/ig));
    let freeStatuses = [false, false];
    freeStatuses[0] = t[0][1] === "Свободно";
    freeStatuses[1] = t[1][1] === "Свободно";
    console.log(freeStatuses);

    return reply.end`Первая стиралка сейчас ${freeStatuses[0] ? "свободна" : "занята"}${freeStatuses[0] === freeStatuses[1] ? " и" : ", а"} вторая стиралка ${freeStatuses[1] ? "свободна" : "занята"}`
});
/*

const middleware = () => {
    return async (ctx, next) => {
        //console.log(ctx);
        return next(ctx);
    }
}

alice.use(middleware());*//*
alice.on("request", (ctx) => {
    console.log(ctx);
})*/


const server = alice.listen(3000, "");
