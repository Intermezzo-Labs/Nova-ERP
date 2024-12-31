create table ai_rooms (
    id uuid primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    metadata jsonb default '{}'::jsonb
);

-- Add foreign key constraint to ai_memories table
alter table ai_memories 
    add constraint ai_memories_room_id_fkey 
    foreign key (room_id) 
    references ai_rooms(id) 
    on delete cascade;
