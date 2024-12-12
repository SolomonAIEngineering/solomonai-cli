export interface Budget {
	id: string;
	amount: number;
	category: string;
	timePeriod: string;
	spent: number;
	remaining: number;
	status: 'active' | 'exceeded' | 'completed';
	createdAt: Date;
	updatedAt: Date;
}

export interface ForecastResult {
	timePeriod: string;
	revenue: {
		projected: number;
		bestCase: number;
		worstCase: number;
	};
	expenses: {
		projected: number;
		bestCase: number;
		worstCase: number;
	};
	profitMargin: {
		projected: number;
		bestCase: number;
		worstCase: number;
	};
	variables: Record<string, number>;
}
