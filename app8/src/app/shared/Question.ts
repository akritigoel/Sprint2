export class Question{
    questionId : number

	choice:Number
	questionTitle : String
	questionAnswer : Number
	questionMarks : Number
	questionOptions:Array<Answer>=[];
	chosenAnswer : Number 
	marksScored : Number

}
export class Answer{
	answerId:Number;
	values:String;
}
