import Ajv from 'ajv';
import { readFile } from 'fs/promises';

const ajv = new Ajv({
	allErrors: true,
	verbose: true,
	strict: false,
});

export async function validateSchema(
	data: unknown,
	schemaPath?: string,
): Promise<boolean> {
	try {
		if (!schemaPath) {
			return true; // No schema to validate against
		}

		const schemaContent = await readFile(schemaPath, 'utf-8');
		const schema = JSON.parse(schemaContent);

		const validate = ajv.compile(schema);
		const valid = validate(data);

		if (!valid && validate.errors) {
			// Log validation errors
			validate.errors.forEach((error) => {
				console.error(
					`Validation error at ${error.instancePath}: ${error.message}`,
				);
			});
		}

		return !!valid;
	} catch (error) {
		throw new Error(`Schema validation failed: ${error}`);
	}
}

export function validateConfigSchema(config: unknown): boolean {
	// Basic config schema
	const schema = {
		type: 'object',
		required: ['api-key', 'org-id', 'tenant-id', 'default-template'],
		properties: {
			'api-key': { type: 'string' },
			'org-id': { type: 'string' },
			'tenant-id': { type: 'string' },
			'default-template': { type: 'string' },
			environment: { type: 'string' },
			'vault-type': {
				type: 'string',
				enum: ['aws-secrets', 'azure-keyvault', 'hashicorp'],
			},
			'vault-url': { type: 'string' },
			'schema-path': { type: 'string' },
		},
		additionalProperties: true,
	};

	const validate = ajv.compile(schema);
	return validate(config);
}
