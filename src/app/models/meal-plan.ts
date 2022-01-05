import { MealPlanNote } from "./meal-plan-note";

export class MealPlan {
    constructor(
        public id: number,
        public user: string,
        public name: string,
        public mealPlanNotes: MealPlanNote,
    ) { }
}

