import { Group } from "../Model/Model";

export function rotateGroup(model, key) {
    if (JSON.stringify(model.selectedGroup) != JSON.stringify(new Group(-1, -1)))
    {
        if (key === 'ArrowLeft')
        {
            model.rotateCCW(model.selectedGroup)
        } else if (key === 'ArrowRight')
        {
            model.rotateCW(model.selectedGroup)
        }
    }
}