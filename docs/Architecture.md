graph TD
Client[Client Browser]
SvelteKit[SvelteKit Application]
Supabase[Supabase Backend]
Storage[Supabase Storage]
Database[(PostgreSQL Database)]

    subgraph Frontend
        Client -->|HTTP/WebSocket| SvelteKit
        SvelteKit -->|Auth| Client
        SvelteKit -->|State Management| Client
    end

    subgraph Backend
        SvelteKit -->|API Calls| Supabase
        Supabase -->|Data| SvelteKit
        Supabase -->|Auth| Database
        Supabase -->|Files| Storage
        Database -->|Data| Supabase
    end

    subgraph Main Features
        Customers[Customers Management]
        Invoices[Invoice System]
        Products[Product Management]
        Companies[Company Management]
        Marketing[Marketing Tools]
    end

    SvelteKit --> Customers
    SvelteKit --> Invoices
    SvelteKit --> Products
    SvelteKit --> Companies
    SvelteKit --> Marketing

    subgraph Database Schema
        Users[(Users)]
        CustomerTable[(Customers)]
        InvoiceTable[(Invoices)]
        ProductTable[(Products)]
        CompanyTable[(Companies)]
    end

    Database --> Users
    Database --> CustomerTable
    Database --> InvoiceTable
    Database --> ProductTable
    Database --> CompanyTable
