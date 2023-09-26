import { Group } from "../Model/Model";

export function rotateGroup(model, key) {
    if (JSON.stringify(model.selectedGroup) != JSON.stringify(new Group(-1, -1)))
    {
        if (key === 'ArrowLeft' || key.toLowerCase() === 'a')
        {
            model.rotateCCW(model.selectedGroup)
        } else if (key === 'ArrowRight' || key.toLowerCase() === 'd')
        {
            model.rotateCW(model.selectedGroup)
        }
    }
}