export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
	graphql_public: {
		Tables: {
			[_ in never]: never;
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			graphql: {
				Args: {
					operationName?: string;
					query?: string;
					variables?: Json;
					extensions?: Json;
				};
				Returns: Json;
			};
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
	public: {
		Tables: {
			ai_memories: {
				Row: {
					content: Json;
					created_at: string;
					embedding: string | null;
					id: number;
					metadata: Json | null;
					room_id: string;
				};
				Insert: {
					content: Json;
					created_at?: string;
					embedding?: string | null;
					id?: number;
					metadata?: Json | null;
					room_id: string;
				};
				Update: {
					content?: Json;
					created_at?: string;
					embedding?: string | null;
					id?: number;
					metadata?: Json | null;
					room_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'ai_memories_room_id_fkey';
						columns: ['room_id'];
						isOneToOne: false;
						referencedRelation: 'ai_rooms';
						referencedColumns: ['id'];
					}
				];
			};
			ai_rooms: {
				Row: {
					created_at: string;
					id: string;
					metadata: Json | null;
				};
				Insert: {
					created_at?: string;
					id: string;
					metadata?: Json | null;
				};
				Update: {
					created_at?: string;
					id?: string;
					metadata?: Json | null;
				};
				Relationships: [];
			};
			company: {
				Row: {
					archived_at: string | null;
					created_at: string;
					details: Json;
					id: number;
					shared_with: Json | null;
					updated_at: string;
					user_id: string;
				};
				Insert: {
					archived_at?: string | null;
					created_at?: string;
					details: Json;
					id?: number;
					shared_with?: Json | null;
					updated_at?: string;
					user_id: string;
				};
				Update: {
					archived_at?: string | null;
					created_at?: string;
					details?: Json;
					id?: number;
					shared_with?: Json | null;
					updated_at?: string;
					user_id?: string;
				};
				Relationships: [];
			};
			customer: {
				Row: {
					archived_at: string | null;
					company_id: number | null;
					created_at: string;
					details: Json;
					email: string | null;
					id: number;
					phone: string | null;
					updated_at: string;
					user_id: string;
				};
				Insert: {
					archived_at?: string | null;
					company_id?: number | null;
					created_at?: string;
					details: Json;
					email?: string | null;
					id?: number;
					phone?: string | null;
					updated_at?: string;
					user_id: string;
				};
				Update: {
					archived_at?: string | null;
					company_id?: number | null;
					created_at?: string;
					details?: Json;
					email?: string | null;
					id?: number;
					phone?: string | null;
					updated_at?: string;
					user_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'customer_company_id_fkey';
						columns: ['company_id'];
						isOneToOne: false;
						referencedRelation: 'company';
						referencedColumns: ['id'];
					}
				];
			};
			customer_note: {
				Row: {
					created_at: string;
					customer_id: number | null;
					id: number;
					note: string;
					updated_at: string;
					user_id: string;
				};
				Insert: {
					created_at?: string;
					customer_id?: number | null;
					id?: number;
					note: string;
					updated_at?: string;
					user_id: string;
				};
				Update: {
					created_at?: string;
					customer_id?: number | null;
					id?: number;
					note?: string;
					updated_at?: string;
					user_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'customer_note_customer_id_fkey';
						columns: ['customer_id'];
						isOneToOne: false;
						referencedRelation: 'customer';
						referencedColumns: ['id'];
					}
				];
			};
			inventory_item: {
				Row: {
					company_id: number;
					created_at: string;
					details: Json;
					id: number;
					quantity: number | null;
					updated_at: string;
					user_id: string;
				};
				Insert: {
					company_id: number;
					created_at?: string;
					details: Json;
					id?: number;
					quantity?: number | null;
					updated_at?: string;
					user_id: string;
				};
				Update: {
					company_id?: number;
					created_at?: string;
					details?: Json;
					id?: number;
					quantity?: number | null;
					updated_at?: string;
					user_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'inventory_item_company_id_fkey';
						columns: ['company_id'];
						isOneToOne: false;
						referencedRelation: 'company';
						referencedColumns: ['id'];
					}
				];
			};
			invoice: {
				Row: {
					company_id: number;
					created_at: string;
					customer_id: number;
					document_location: string;
					id: number;
					status: Database['public']['Enums']['invoice_status'];
					total: number;
					updated_at: string;
					user_id: string;
				};
				Insert: {
					company_id: number;
					created_at?: string;
					customer_id: number;
					document_location: string;
					id?: number;
					status?: Database['public']['Enums']['invoice_status'];
					total: number;
					updated_at?: string;
					user_id: string;
				};
				Update: {
					company_id?: number;
					created_at?: string;
					customer_id?: number;
					document_location?: string;
					id?: number;
					status?: Database['public']['Enums']['invoice_status'];
					total?: number;
					updated_at?: string;
					user_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'invoice_company_id_fkey';
						columns: ['company_id'];
						isOneToOne: false;
						referencedRelation: 'company';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'invoice_customer_id_fkey';
						columns: ['customer_id'];
						isOneToOne: false;
						referencedRelation: 'customer';
						referencedColumns: ['id'];
					}
				];
			};
			invoice_note: {
				Row: {
					created_at: string;
					id: number;
					invoice_id: number | null;
					note: string;
					updated_at: string;
					user_id: string;
				};
				Insert: {
					created_at?: string;
					id?: number;
					invoice_id?: number | null;
					note: string;
					updated_at?: string;
					user_id: string;
				};
				Update: {
					created_at?: string;
					id?: number;
					invoice_id?: number | null;
					note?: string;
					updated_at?: string;
					user_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'invoice_note_invoice_id_fkey';
						columns: ['invoice_id'];
						isOneToOne: false;
						referencedRelation: 'invoice';
						referencedColumns: ['id'];
					}
				];
			};
			nova_users: {
				Row: {
					archived_at: string | null;
					created_at: string;
					email: string | null;
					id: number;
					preferences: Json | null;
					role: Database['public']['Enums']['nova_user_role'];
					status: Database['public']['Enums']['nova_user_status'];
					updated_at: string;
					user_id: string;
				};
				Insert: {
					archived_at?: string | null;
					created_at?: string;
					email?: string | null;
					id?: number;
					preferences?: Json | null;
					role?: Database['public']['Enums']['nova_user_role'];
					status?: Database['public']['Enums']['nova_user_status'];
					updated_at?: string;
					user_id: string;
				};
				Update: {
					archived_at?: string | null;
					created_at?: string;
					email?: string | null;
					id?: number;
					preferences?: Json | null;
					role?: Database['public']['Enums']['nova_user_role'];
					status?: Database['public']['Enums']['nova_user_status'];
					updated_at?: string;
					user_id?: string;
				};
				Relationships: [];
			};
			product: {
				Row: {
					company_id: number;
					created_at: string;
					details: Json;
					id: number;
					inventory_item_id: number | null;
					updated_at: string;
					user_id: string;
				};
				Insert: {
					company_id: number;
					created_at?: string;
					details: Json;
					id?: number;
					inventory_item_id?: number | null;
					updated_at?: string;
					user_id: string;
				};
				Update: {
					company_id?: number;
					created_at?: string;
					details?: Json;
					id?: number;
					inventory_item_id?: number | null;
					updated_at?: string;
					user_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'product_company_id_fkey';
						columns: ['company_id'];
						isOneToOne: false;
						referencedRelation: 'company';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'product_inventory_item_id_fkey';
						columns: ['inventory_item_id'];
						isOneToOne: false;
						referencedRelation: 'inventory_item';
						referencedColumns: ['id'];
					}
				];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			binary_quantize:
				| {
						Args: {
							'': string;
						};
						Returns: unknown;
				  }
				| {
						Args: {
							'': unknown;
						};
						Returns: unknown;
				  };
			get_user_by_pubkey: {
				Args: {
					p_pubkey: string;
				};
				Returns: unknown;
			};
			halfvec_avg: {
				Args: {
					'': number[];
				};
				Returns: unknown;
			};
			halfvec_out: {
				Args: {
					'': unknown;
				};
				Returns: unknown;
			};
			halfvec_send: {
				Args: {
					'': unknown;
				};
				Returns: string;
			};
			halfvec_typmod_in: {
				Args: {
					'': unknown[];
				};
				Returns: number;
			};
			hnsw_bit_support: {
				Args: {
					'': unknown;
				};
				Returns: unknown;
			};
			hnsw_halfvec_support: {
				Args: {
					'': unknown;
				};
				Returns: unknown;
			};
			hnsw_sparsevec_support: {
				Args: {
					'': unknown;
				};
				Returns: unknown;
			};
			hnswhandler: {
				Args: {
					'': unknown;
				};
				Returns: unknown;
			};
			ivfflat_bit_support: {
				Args: {
					'': unknown;
				};
				Returns: unknown;
			};
			ivfflat_halfvec_support: {
				Args: {
					'': unknown;
				};
				Returns: unknown;
			};
			ivfflathandler: {
				Args: {
					'': unknown;
				};
				Returns: unknown;
			};
			l2_norm:
				| {
						Args: {
							'': unknown;
						};
						Returns: number;
				  }
				| {
						Args: {
							'': unknown;
						};
						Returns: number;
				  };
			l2_normalize:
				| {
						Args: {
							'': string;
						};
						Returns: string;
				  }
				| {
						Args: {
							'': unknown;
						};
						Returns: unknown;
				  }
				| {
						Args: {
							'': unknown;
						};
						Returns: unknown;
				  };
			match_memories: {
				Args: {
					query_embedding: string;
					match_threshold: number;
					match_limit: number;
				};
				Returns: {
					id: number;
					content: Json;
					similarity: number;
				}[];
			};
			sparsevec_out: {
				Args: {
					'': unknown;
				};
				Returns: unknown;
			};
			sparsevec_send: {
				Args: {
					'': unknown;
				};
				Returns: string;
			};
			sparsevec_typmod_in: {
				Args: {
					'': unknown[];
				};
				Returns: number;
			};
			vector_avg: {
				Args: {
					'': number[];
				};
				Returns: string;
			};
			vector_dims:
				| {
						Args: {
							'': string;
						};
						Returns: number;
				  }
				| {
						Args: {
							'': unknown;
						};
						Returns: number;
				  };
			vector_norm: {
				Args: {
					'': string;
				};
				Returns: number;
			};
			vector_out: {
				Args: {
					'': string;
				};
				Returns: unknown;
			};
			vector_send: {
				Args: {
					'': string;
				};
				Returns: string;
			};
			vector_typmod_in: {
				Args: {
					'': unknown[];
				};
				Returns: number;
			};
		};
		Enums: {
			invoice_status: 'Pending' | 'Canceled' | 'Stale' | 'Completed' | 'Rejected';
			nova_user_role: 'Admin' | 'Manager' | 'User';
			nova_user_status: 'Active' | 'Inactive';
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
	PublicTableNameOrOptions extends
		| keyof (PublicSchema['Tables'] & PublicSchema['Views'])
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
				Database[PublicTableNameOrOptions['schema']]['Views'])
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
			Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
			Row: infer R;
		}
		? R
		: never
	: PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
		? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
				Row: infer R;
			}
			? R
			: never
		: never;

export type TablesInsert<
	PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Insert: infer I;
		}
		? I
		: never
	: PublicTableNameOrOptions extends keyof PublicSchema['Tables']
		? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
				Insert: infer I;
			}
			? I
			: never
		: never;

export type TablesUpdate<
	PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Update: infer U;
		}
		? U
		: never
	: PublicTableNameOrOptions extends keyof PublicSchema['Tables']
		? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
				Update: infer U;
			}
			? U
			: never
		: never;

export type Enums<
	PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
	EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
		: never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
	? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
	: PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
		? PublicSchema['Enums'][PublicEnumNameOrOptions]
		: never;

export type CompositeTypes<
	PublicCompositeTypeNameOrOptions extends
		| keyof PublicSchema['CompositeTypes']
		| { schema: keyof Database },
	CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
		: never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
	? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
	: PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
		? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
		: never;
