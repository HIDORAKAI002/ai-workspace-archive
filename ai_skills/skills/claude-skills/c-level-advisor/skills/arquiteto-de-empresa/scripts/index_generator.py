#!/usr/bin/env python3
"""index_generator.py — (Re)gera as tabelas de conceitos dos index.md de um bundle OKF.

Para cada pasta que tenha um `index.md` com os marcadores
`<!-- okf:index:start -->` ... `<!-- okf:index:end -->`, lê os conceitos irmãos
(.md que não sejam index.md/log.md), extrai title/description/type/status do
frontmatter e regenera a tabela entre os marcadores.

Por padrão é dry-run (mostra o que mudaria). Use --write para gravar.
Determinístico, apenas stdlib.

Uso:
    python index_generator.py                      # demo em bundle de exemplo embutido
    python index_generator.py ./minha-empresa      # dry-run: mostra tabelas propostas
    python index_generator.py ./minha-empresa --write
    python index_generator.py ./minha-empresa --output json
    python index_generator.py --sample
"""

import argparse
import json
import os
import sys
import tempfile

START = "<!-- okf:index:start -->"
END = "<!-- okf:index:end -->"
RESERVED = {"index.md", "log.md"}


def parse_frontmatter(text):
    if not text.startswith("---"):
        return {}
    end = text.find("\n---", 3)
    if end == -1:
        return {}
    fm = {}
    for line in text[3:end].strip("\n").splitlines():
        if line and not line.startswith((" ", "\t")) and ":" in line:
            key, _, val = line.partition(":")
            fm[key.strip()] = val.strip().strip('"').strip("'")
    return fm


def concept_rows(folder):
    rows = []
    for name in sorted(os.listdir(folder)):
        if not name.endswith(".md") or name in RESERVED:
            continue
        full = os.path.join(folder, name)
        if not os.path.isfile(full):
            continue
        try:
            with open(full, "r", encoding="utf-8") as f:
                fm = parse_frontmatter(f.read())
        except (IOError, OSError):
            fm = {}
        slug = name[:-3]
        title = fm.get("title", slug)
        what = fm.get("description", title)
        tp = fm.get("type", "?")
        status = fm.get("status", "")
        rows.append(f"| [{slug}]({name}) | {what} | {tp} | {status} |")
    if not rows:
        rows = ["<!-- (sem conceitos ainda) -->"]
    return rows


def replace_between(text, body):
    si = text.find(START)
    ei = text.find(END)
    if si == -1 or ei == -1 or ei < si:
        return None  # sem marcadores
    new_block = START + "\n" + "\n".join(body) + "\n" + END
    return text[:si] + new_block + text[ei + len(END):]


def process(bundle_dir, write):
    bundle_dir = os.path.abspath(bundle_dir)
    results = []
    for root, _, files in os.walk(bundle_dir):
        if "index.md" not in files:
            continue
        idx = os.path.join(root, "index.md")
        try:
            with open(idx, "r", encoding="utf-8") as f:
                text = f.read()
        except (IOError, OSError):
            continue
        if START not in text:
            continue
        rows = concept_rows(root)
        new_text = replace_between(text, rows)
        rel = os.path.relpath(idx, bundle_dir)
        changed = new_text is not None and new_text != text
        if write and changed:
            with open(idx, "w", encoding="utf-8") as f:
                f.write(new_text)
        results.append({
            "index": rel,
            "concepts": len([r for r in rows if r.startswith("|")]),
            "changed": changed,
            "rows": rows,
        })
    return {
        "bundle": bundle_dir,
        "mode": "write" if write else "dry-run",
        "indexes_processed": len(results),
        "indexes_changed": sum(1 for r in results if r["changed"]),
        "results": results,
    }


def build_sample_bundle(base):
    root = os.path.join(base, "exemplo")
    os.makedirs(os.path.join(root, "00-fundacao"), exist_ok=True)
    with open(os.path.join(root, "00-fundacao", "index.md"), "w", encoding="utf-8") as f:
        f.write("# Fundação\n\n## Conceitos\n\n| Conceito | O que é | type | status |\n|---|---|---|---|\n"
                + START + "\n" + END + "\n")
    with open(os.path.join(root, "00-fundacao", "identidade.md"), "w", encoding="utf-8") as f:
        f.write("---\ntype: Fundação\ntitle: Identidade\ndescription: Propósito, missão e valores\n"
                "status: rascunho\n---\n\n# Identidade\n")
    return root


def render_text(r):
    out = ["=" * 64, "INDEX GENERATOR (OKF)", f"Bundle: {r['bundle']}",
           f"Modo: {r['mode']}   index.md processados: {r['indexes_processed']}   "
           f"alterados: {r['indexes_changed']}", "=" * 64]
    for item in r["results"]:
        flag = "ALTERA" if item["changed"] else "ok"
        out.append(f"\n[{flag}] {item['index']}  ({item['concepts']} conceito(s))")
        for row in item["rows"]:
            out.append(f"    {row}")
    if r["mode"] == "dry-run":
        out.append("\n(dry-run: nada gravado. Use --write para aplicar.)")
    return "\n".join(out)


def main():
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

    p = argparse.ArgumentParser(
        description="(Re)gera as tabelas de conceitos dos index.md de um bundle OKF.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__,
    )
    p.add_argument("path", nargs="?", help="Pasta do bundle (omitido = exemplo embutido)")
    p.add_argument("--sample", action="store_true", help="Usa o bundle de exemplo embutido")
    p.add_argument("--write", action="store_true", help="Grava as mudanças (default: dry-run)")
    p.add_argument("--output", choices=("text", "json"), default="text")
    args = p.parse_args()

    if args.path and not args.sample:
        if not os.path.isdir(args.path):
            print(f"erro: não é uma pasta: {args.path}", file=sys.stderr)
            return 2
        result = process(args.path, args.write)
    else:
        with tempfile.TemporaryDirectory() as tmp:
            result = process(build_sample_bundle(tmp), args.write)
            result["bundle"] = "<bundle de exemplo embutido>"

    if args.output == "json":
        print(json.dumps(result, indent=2, ensure_ascii=False))
    else:
        print(render_text(result))
    return 0


if __name__ == "__main__":
    sys.exit(main())
