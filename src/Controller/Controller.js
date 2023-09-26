import { Group } from "../Model/Model";

export function selectGroup(model, group) {
    model.selectGroup(group)
}

export function rotateGroup(model, direction) {
    if (JSON.stringify(model.selectedGroup) != JSON.stringify(new Group(-1, -1)))
    {
        if (direction == 'CW')
        {
            model.rotateCW(model.selectedGroup)
        } else
        {
            model.rotateCCW(model.selectedGroup)
        }
    }
}