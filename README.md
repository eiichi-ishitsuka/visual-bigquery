# visual-bigquery
Visual Studio Code extension for Google BigQuery SQL  
Target extension: ".sql"

# Syntax Highlight 
All keywords are not case sensitive.

## Keywords

### Reserved

Reserved Keywords  
https://cloud.google.com/bigquery/docs/reference/standard-sql/lexical#reserved_keywords

### DML

https://cloud.google.com/bigquery/docs/reference/standard-sql/dml-syntax

- `INSERT`
- `UPDATE`
- `DELETE`
- `TRUNCATE TABLE`
- `VALUES`
- `MERGE`

### DDL

https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language
  

- `ADD COLUMN`
- `ALTER COLUMN`
- `ALTER MATERIALIZED VIEW`
- `ALTER SCHEMA`
- `ALTER TABLE`
- `ALTER VIEW`
- `CREATE EXTERNAL TABLE`
- `CREATE FUNCTION`
- `CREATE MATERIALIZED VIEW`
- `CREATE PROCEDURE`
- `CREATE SCHEMA`
- `CREATE TABLE`
- `CREATE VIEW`
- `CREATE OR REPLACE EXTERNAL TABLE`
- `CREATE OR REPLACE FUNCTION`
- `CREATE OR REPLACE MATERIALIZED VIEW`
- `CREATE OR REPLACE PROCEDURE`
- `CREATE OR REPLACE SCHEMA`
- `CREATE OR REPLACE TABLE`
- `CREATE OR REPLACE VIEW`
- `DROP COLUMN`
- `DROP EXTERNAL TABLE`
- `DROP FUNCTION`
- `DROP MATERIALIZED VIEW`
- `DROP NOT NULL`
- `DROP PROCEDURE`
- `DROP SCHEMA`
- `DROP TABLE`
- `DROP VIEW`
- `SET OPTIONS`

### DCL

https://cloud.google.com/bigquery/docs/reference/standard-sql/data-control-language
  

- `REVOKE`
- `GRANT`
- `SCHEMA`

### User-defined Function / Table Function

User-defined Function  
https://cloud.google.com/bigquery/docs/reference/standard-sql/user-defined-functions
  
Table Function  
https://cloud.google.com/bigquery/docs/reference/standard-sql/table-functions
  

- Permanent UDF
    - `CREATE FUNCTION`
    - `CREATE TABLE FUNCTION`
    - `CREATE OR REPLACE TABLE FUNCTION`
    - `CREATE OR REPLACE FUNCTION`
    - `DROP FUNCTION`
    - `DROP TABLE FUNCTION`
- Temporary UDF
    - `CREATE TEMP FUNCTION`
    - `CREATE TEMPORARY FUNCTION`
    - `CREATE OR REPLACE TEMP FUNCTION`
    - `CREATE OR REPLACE TEMPORARY FUNCTION`
- Others
    - `LANGUAGE`
    - `RETURNS`

### External Query

- `EXTERNAL_QUERY`

### Pseudo Columns

- `_PARTITIONTIME`
- `_TABLE_SUFFIX`

### Scripts and stored procedures

Scripts and stored procedures  
https://cloud.google.com/bigquery/docs/reference/standard-sql/scripting-concepts
  

- `BEGIN`
- `END`
- `DECLARE`
- `CALL`

## Entities

### Types

BigQuery data types  
https://cloud.google.com/bigquery/docs/reference/standard-sql/functions-and-operators#comparison_chart
### Functions

Expressions, functions, and operators in Standard SQL  
https://cloud.google.com/bigquery/docs/reference/standard-sql/functions-and-operators

### BackQuated
Examples

- `project.dataset.table`
- `dataset.table`

## Variables

- `@variable`

## Constants
### Numeric

- `0`
- `0.0`

## Strings

- `'Single quote'`
- `"Double quote"`
- `'''Triple Single quote'''`
- `"""Triple Double quote"""`

## Comments

- `# inline`
- `-- inline`
- `/* block */`

## Invalid

Invalid words not in quote
