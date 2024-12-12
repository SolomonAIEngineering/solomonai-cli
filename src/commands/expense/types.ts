export interface Expense {
	id: string;
	amount: number;
	currency: string;
	category: string;
	description: string;
	createdAt: Date;
	updatedAt: Date;
}

export type ExpenseCategory =
	| 'office-supplies'
	| 'travel'
	| 'marketing'
	| 'software'
	| 'utilities'
	| 'payroll'
	| 'rent'
	| 'other';
