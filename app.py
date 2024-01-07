import os
from lambda_function import lambda_handler
from flask import Flask, request, render_template, redirect, url_for, send_from_directory
from werkzeug.utils import secure_filename
from datetime import datetime


ALLOWED_EXTENSIONS = set(['csv'])

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def create_app():
    app = Flask(__name__, template_folder='static/templates')

    @app.route('/upload', methods=['GET', 'POST'])
    def upload():
        if request.method == 'POST':
            file = request.files['file']
            if file and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                #new_filename = f'{filename.split(".")[0]}_{str(datetime.now())}.csv'
                save_location = os.path.join('input', filename)
                file.save(save_location)

                #output_file = process_csv(save_location)
                #return send_from_directory('output', output_file)
            
            lambda_handler()     
            return render_template('upload.html')
        
        return render_template('upload.html')

    

    if __name__ == '__main__':
        app.run(debug=True)




create_app()