-- Create extension for vector operations
create extension if not exists vector;

-- Create table for AI memories
create table ai_memories (
    id serial primary key,
    content jsonb not null,
    embedding vector(1536),
    room_id uuid not null,
    metadata jsonb,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create function for similarity search
create or replace function match_memories(
    query_embedding vector(1536),
    match_threshold float,
    match_limit int
)
returns table (
    id integer,
    content jsonb,
    similarity double precision
)
language plpgsql
as $$
begin
    return query
    select
        ai_memories.id,
        ai_memories.content,
        1 - (ai_memories.embedding <=> query_embedding) as similarity
    from ai_memories
    where 1 - (ai_memories.embedding <=> query_embedding) > match_threshold
    order by ai_memories.embedding <=> query_embedding
    limit match_limit;
end;
$$;

-- Create index for faster similarity search
create index on ai_memories
using ivfflat (embedding vector_cosine_ops)
with (lists = 100);
