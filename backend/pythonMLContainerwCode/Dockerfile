FROM public.ecr.aws/lambda/python:3.7

RUN yum -y install tar gzip zlib freetype-devel \
    gcc \
    ghostscript \
    lcms2-devel \
    libffi-devel \
    libimagequant-devel \
    libjpeg-devel \
    libraqm-devel \
    libtiff-devel \
    libwebp-devel \
    make \
    openjpeg2-devel \
    rh-python36 \
    rh-python36-python-virtualenv \
    sudo \
    tcl-devel \
    tk-devel \
    tkinter \
    which \
    xorg-x11-server-Xvfb \
    zlib-devel \
    && yum clean all

COPY requirements.txt ./
RUN python3.7 -m pip install -r requirements.txt
RUN pip uninstall -y pillow && CC="cc -mavx2" pip install -U --force-reinstall pillow-simd


COPY final_iris_model.h5 ./
COPY iris_scaler.pkl ./
COPY app.py   ./

CMD ["app.lambda_handler"]