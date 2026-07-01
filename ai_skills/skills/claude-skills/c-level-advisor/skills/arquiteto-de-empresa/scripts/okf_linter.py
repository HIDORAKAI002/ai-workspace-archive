#!/usr/bin/env python3
"""okf_linter.py — Valida a conformância OKF (Open Knowledge Format) de um bundle de empresa.

Regras verificadas (ver references/okf_conformance.md):
  1. Todo conceito (.md que não seja index.md/log.md) tem frontmatter com `type` não vazio.   [ERRO]
  2. O `type` pertence ao vocabulário controlado.                                              [AVISO]
  3. index.md / log.md NÃO têm `type`.                                                          [ERRO]
  4. Links markdown relativos (.md) resolvem para arquivos existentes.                          [ERRO]
  5. Toda pasta com conceitos tem um index.md.                                                  [AVISO]

Sai com código 0 se não houver ERROS (avisos não falham). Determinístico, apenas stdlib.

Uso:
    python okf_linter.py                       # lint de um bundle de exemplo embutido (PASS)
    python okf_linter.py ./minha-empresa
    python okf_linter.py ./minha-empresa --output json
    python okf_linter.py --sample              # idem ao primeiro
"""

import argparse
import json
import os
import re
import sys
import tempfile

VALID_TYPES = {
    "Fundação", "Problema-Solução", "Estratégia", "Análise de Mercado", "Persona",
    "Modelo Financeiro", "Processo Comercial", "Playbook", "Marca",
    "Estratégia de Conteúdo", "Documento de Produto", "Processo", "Runbook",
    "Recurso Operacional", "Arquitetura", "Organização", "Documento Jurídico",
    "OKR", "Métrica", "Ritual",
}

RESERVED = {"index.md", "log.md"}
LINK_RE = re.compile(r"\[[^\]]+\]\(([^)]+\.md)(?:#[^)]*)?\)")


def parse_frontmatter(text):
    """Retorna (tem_frontmatter, dict_simples). Parser mínimo: pares chave: valor de 1º nível."""
    if not text.startswith("---"):
        return False, {}
    end = text.find("\n---", 3)
    if end == -1:
        return False, {}
    block = text[3:end].strip("\n")
    fm = {}
    for line in block.splitlines():
        if line and not line.startswith((" ", "\t")) and ":" in line:
            key, _, val = line.partition(":")
            fm[key.strip()] = val.strip().strip('"').strip("'")
    return True, fm


def lint(bundle_dir):
    findings = []  # cada item: {severity, rule, path, detail}
    bundle_dir = os.path.abspath(bundle_dir)

    md_files = []
    dirs_with_concepts = set()
    for root, _, files in os.walk(bundle_dir):
        for name in files:
            if name.endswith(".md"):
                full = os.path.join(root, name)
                md_files.append(full)
                if name not in RESERVED:
                    dirs_with_concepts.add(root)

    for full in sorted(md_files):
        rel = os.path.relpath(full, bundle_dir)
        name = os.path.basename(full)
        try:
            with open(full, "r", encoding="utf-8") as f:
                text = f.read()
        except (IOError, OSError) as e:
            findings.append({"severity": "error", "rule": "leitura", "path": rel, "detail": str(e)})
            continue

        has_fm, fm = parse_frontmatter(text)
        is_reserved = name in RESERVED

        if is_reserved:
            if has_fm and fm.get("type"):
                findings.append({"severity": "error", "rule": "reservado_sem_type", "path": rel,
                                 "detail": f"{name} é reservado e não pode ter `type`"})
        else:
            tp = fm.get("type", "").strip() if has_fm else ""
            if not tp:
                findings.append({"severity": "error", "rule": "type_obrigatorio", "path": rel,
                                 "detail": "conceito sem `type` no frontmatter"})
            elif tp not in VALID_TYPES:
                findings.append({"severity": "warning", "rule": "type_desconhecido", "path": rel,
                                 "detail": f"`type: {tp}` fora do vocabulário"})

        # links relativos .md resolvem
        for m in LINK_RE.finditer(text):
            target = m.group(1)
            if target.startswith("http"):
                continue
            resolved = os.path.normpath(os.path.join(os.path.dirname(full), target))
            if not os.path.exists(resolved):
                findings.append({"severity": "error", "rule": "link_quebrado", "path": rel,
                                 "detail": f"link para inexistente: {target}"})

    # pastas com conceitos têm index.md
    for d in sorted(dirs_with_concepts):
        if not os.path.exists(os.path.join(d, "index.md")):
            rel = os.path.relpath(d, bundle_dir) or "."
            findings.append({"severity": "warning", "rule": "index_ausente", "path": rel,
                             "detail": "pasta com conceitos sem index.md"})

    errors = [f for f in findings if f["severity"] == "error"]
    warnings = [f for f in findings if f["severity"] == "warning"]
    return {
        "bundle": bundle_dir,
        "md_files": len(md_files),
        "errors": len(errors),
        "warnings": len(warnings),
        "findings": findings,
        "verdict": "PASS" if not errors else "FAIL",
    }


def build_sample_bundle(base):
    """Cria um bundle mínimo e CONFORME para demonstração; retorna o caminho."""
    root = os.path.join(base, "exemplo")
    os.makedirs(os.path.join(root, "00-fundacao"), exist_ok=True)
    with open(os.path.join(root, "index.md"), "w", encoding="utf-8") as f:
        f.write("# Exemplo\n\n[Fundação](00-fundacao/index.md)\n")
    with open(os.path.join(root, "log.md"), "w", encoding="utf-8") as f:
        f.write("# Log\n\n## 2026-01-01T00:00:00Z — criado\n")
    with open(os.path.join(root, "00-fundacao", "index.md"), "w", encoding="utf-8") as f:
        f.write("# Fundação\n\n[identidade](identidade.md)\n")
    with open(os.path.join(root, "00-fundacao", "identidade.md"), "w", encoding="utf-8") as f:
        f.write("---\ntype: Fundação\ntitle: Identidade\n---\n\n# Identidade\n\nVolta ao [index](index.md).\n")
    return root


def render_text(r):
    out = []
    out.append("=" * 64)
    out.append("OKF LINTER")
    out.append(f"Bundle: {r['bundle']}")
    out.append(f"Arquivos .md: {r['md_files']}   Erros: {r['errors']}   Avisos: {r['warnings']}")
    out.append("=" * 64)
    if not r["findings"]:
        out.append("  Nenhum problema encontrado.")
    for f in r["findings"]:
        tag = "ERRO " if f["severity"] == "error" else "AVISO"
        out.append(f"  [{tag}] {f['rule']:22s} {f['path']}: {f['detail']}")
    out.append("-" * 64)
    out.append(f"Veredito: {r['verdict']}")
    return "\n".join(out)


def main():
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

    p = argparse.ArgumentParser(
        description="Valida a conformância OKF de um bundle de empresa.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__,
    )
    p.add_argument("path", nargs="?", help="Pasta do bundle (omitido = bundle de exemplo embutido)")
    p.add_argument("--sample", action="store_true", help="Usa o bundle de exemplo embutido")
    p.add_argument("--output", choices=("text", "json"), default="text")
    args = p.parse_args()

    if args.path and not args.sample:
        if not os.path.isdir(args.path):
            print(f"erro: não é uma pasta: {args.path}", file=sys.stderr)
            return 2
        result = lint(args.path)
    else:
        with tempfile.TemporaryDirectory() as tmp:
            result = lint(build_sample_bundle(tmp))
            result["bundle"] = "<bundle de exemplo embutido>"

    if args.output == "json":
        print(json.dumps(result, indent=2, ensure_ascii=False))
    else:
        print(render_text(result))
    return 0 if result["verdict"] == "PASS" else 1


if __name__ == "__main__":
    sys.exit(main())
