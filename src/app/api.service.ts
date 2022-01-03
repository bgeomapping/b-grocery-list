import { Injectable } from '@angular/core';
import { HttpEvent, HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { map, catchError} from 'rxjs/operators';
import { RecipeIngredient, MealPlanRecipe, MealPlanGrocery, MealPlan } from '@app/models';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    readonly http: HttpClient
  ) { }

  public request<T>(fragment: string, httpOptions = null): Observable<T> {
      let requestUrl = `${environment.api}/v1/food/groceries/${fragment}`;
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.get<T>(requestUrl, {headers: headers})
        .pipe(
          catchError(this.handleError)
        );
  }

  private handleError(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          return throwError('An error occurred:' + error.error.message);
      }
      else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          return throwError(`Backend returned code ${error.status}, ` +
              `error: ${error.error}`);
      }
  };


  public getLatestMealPlan(): Observable<MealPlan> {
      return this.request<MealPlan>(`mealPlans/latest`, null);
  }

  public getMealPlan(id: number): Observable<MealPlan> {
      return this.request<MealPlan>(`mealPlans/${id}`, null);
  }
  public getMealPlans(): Observable<MealPlan[]> {
      return this.request<MealPlan[]>(`mealPlans`, null);
  }
  public getMealPlanRecipes(id: number): Observable<MealPlanRecipe[]> {
      return this.request<MealPlanRecipe[]>(`mealPlans/${id}/recipes`, null);
  }
  public getMealPlanRecipe(id: number): Observable<MealPlanRecipe> {
      return this.request<MealPlanRecipe>(`recipes/${id}`, null);
  }

  public getMealPlanGroceries(id: number): Observable<MealPlanGrocery[]> {
      return this.request<MealPlanGrocery[]>(`${id}`, null);
  }

  public getRecipeIngredients(id: number): Observable<RecipeIngredient[]> {
      return this.request<RecipeIngredient[]>(`recipes/${id}/ingredients`, null);
  }

}