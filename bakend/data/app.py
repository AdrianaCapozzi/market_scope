from flask import Flask, jsonify
import pandas as pd

app = Flask(__name__)


EXCEL_PATH = "backend/data/comparativo.xlsx"
ABA_EXCEL = "percentual por uf"

def carregar_dados():
    df = pd.read_excel(EXCEL_PATH, sheet_name=ABA_EXCEL)
    return df.to_dict(orient="records")

@app.route("/api/dados", methods=["GET"])
def get_dados():
    try:
        dados = carregar_dados()
        return jsonify(dados)
    except Exception as e:
        return jsonify({"erro": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)

